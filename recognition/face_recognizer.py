import cv2
import numpy as np
from typing import Tuple, List

from config import LBPH_THRESHOLD
from storage.fs_repo import get_face_samples, add_face_sample, create_person


class FaceRecognizerService:
    def __init__(self, radius=1, neighbors=8, grid_x=8, grid_y=8):
        if not hasattr(cv2, "face") or not hasattr(cv2.face, "LBPHFaceRecognizer_create"):
            raise RuntimeError(
                "LBPH not found. Install opencv-contrib-python, not opencv-python."
            )

        self.model = cv2.face.LBPHFaceRecognizer_create(
            radius=radius, neighbors=neighbors, grid_x=grid_x, grid_y=grid_y
        )
        self._is_trained = False
        self._load_from_storage()

    def _load_from_storage(self):
        samples = get_face_samples()
        images, labels = [], []
        for pid, img_bytes in samples:
            arr = np.frombuffer(img_bytes, dtype=np.uint8)
            img = cv2.imdecode(arr, cv2.IMREAD_GRAYSCALE)
            if img is None:
                continue
            images.append(img)
            labels.append(pid)

        if images:
            self.model.train(images, np.array(labels))
            self._is_trained = True
        else:
            self._is_trained = False

    def _retrain_incremental(self, new_imgs: List[np.ndarray], label: int):
        for img in new_imgs:
            ok, buf = cv2.imencode(".png", img)
            if ok:
                add_face_sample(label, buf.tobytes())
        self._load_from_storage()

    def recognize_or_enroll(self, face_gray_img: np.ndarray) -> Tuple[int, bool]:
        face = cv2.resize(face_gray_img, (200, 200))

        if self._is_trained:
            label, confidence = self.model.predict(face)
            if confidence <= LBPH_THRESHOLD:
                self._retrain_incremental([face], label)
                return label, False

        new_person_id = create_person()
        samples = [face, cv2.equalizeHist(face), cv2.GaussianBlur(face, (3, 3), 0)]
        self._retrain_incremental(samples, new_person_id)
        return new_person_id, True
