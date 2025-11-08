import base64
import cv2
import numpy as np


def load_image_from_form(file_storage):
    if not file_storage:
        return None
    file_bytes = np.frombuffer(file_storage.read(), np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    return img


def load_image_from_base64(b64: str):
    try:
        raw = base64.b64decode(b64)
        file_bytes = np.frombuffer(raw, np.uint8)
        img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
        return img
    except Exception:
        return None


def to_gray(img_bgr):
    return cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)


def crop_face(gray, bbox):
    x, y, w, h = bbox
    face = gray[y: y + h, x: x + w]
    return face
