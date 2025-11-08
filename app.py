from flask import Flask, request, jsonify
from datetime import datetime

from recognition.face_detector import FaceDetector
from recognition.face_recognizer import FaceRecognizerService
from storage.fs_repo import enqueue_if_allowed, get_next_queued_entry, call_next_ticket, set_ticket_status
from utils.image_utils import (
    load_image_from_form,
    load_image_from_base64,
    to_gray,
    crop_face,
)

app = Flask(__name__)

detector = FaceDetector()
recognizer = FaceRecognizerService()


@app.route("/health", methods=["GET"])
def health():
    return {"status": "ok", "time": datetime.now().isoformat()}


@app.route("/ingest_frame", methods=["POST"])
def ingest_frame():
    """
    Принимает:
      - multipart/form-data: file=<jpeg/png>
      - application/json: {"image_base64": "<...>"} без префикса data:
    Ответы:
      - 201, {"enqueued": true, "person_id": int, "ticket_id": int, "queued_at": str}
      - 200, {"enqueued": false, ...}
      - 400, {"enqueued": false, "error": "..."}
    """
    img_bgr = None
    if request.content_type and "multipart/form-data" in request.content_type:
        img_bgr = load_image_from_form(request.files.get("file"))
    elif request.is_json:
        data = request.get_json(silent=True) or {}
        b64 = data.get("image_base64")
        if b64:
            img_bgr = load_image_from_base64(b64)

    if img_bgr is None:
        return jsonify({"enqueued": False, "error": "no_image"}), 400

    gray = to_gray(img_bgr)
    faces = detector.detect(gray)
    if len(faces) == 0:
        return jsonify({"enqueued": False, "reason": "no_face_detected"}), 200

    faces_sorted = sorted(faces, key=lambda b: b[2] * b[3], reverse=True)
    face_bbox = faces_sorted[0]
    face_img = crop_face(gray, face_bbox)

    person_id, is_new = recognizer.recognize_or_enroll(face_img)

    ticket_id = enqueue_if_allowed(person_id)
    if ticket_id is None:
        return jsonify({"enqueued": False}), 200

    return (
        jsonify(
            {
                "enqueued": True,
                "ticket_id": ticket_id,
            }
        ),
        201,
    )


@app.route("/queue/next", methods=["GET"])
def queue_next():
    """
    Получить ближайшего в очереди (peek), не изменяя статус.
    200 {"available": true, "entry": {...}} | 200 {"available": false}
    """
    entry = get_next_queued_entry()
    if entry:
        return jsonify({"available": True, "entry": entry}), 200
    return jsonify({"available": False}), 200


@app.route("/queue/call_next", methods=["POST"])
def queue_call_next():
    """
    Пометить ближайшего 'queued' как 'called'.
    200 {"called": true, "entry": {...}} | 204 (если очередь пуста)
    """
    entry = call_next_ticket()
    if entry:
        return jsonify({"called": True, "entry": entry}), 200
    return "", 204


@app.route("/tickets/<int:ticket_id>/status", methods=["POST"])
def ticket_set_status(ticket_id: int):
    """
    Сменить статус билета. Тело: {"status": "done" | "queued" | "called" | ...}
    """
    data = request.get_json(silent=True) or {}
    status = str(data.get("status", "")).strip().lower()
    if not status:
        return jsonify({"ok": False, "error": "status_required"}), 400
    ok = set_ticket_status(ticket_id, status)
    if not ok:
        return jsonify({"ok": False, "error": "not_found"}), 404
    return jsonify({"ok": True, "ticket_id": ticket_id, "status": status}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
