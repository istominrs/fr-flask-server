import cv2

from config import CASCADE_PATH


class FaceDetector:
    def __init__(self, scale_factor: float = 1.1, min_neighbors: int = 5, min_size=(80, 80)):
        self.cascade = cv2.CascadeClassifier(CASCADE_PATH)
        if self.cascade.empty():
            raise RuntimeError(
                f"Cannot load Haar cascade at '{CASCADE_PATH}'. "
                "Place the file there or set CASCADE_PATH env var."
            )
        self.scale_factor = scale_factor
        self.min_neighbors = min_neighbors
        self.min_size = min_size

    def detect(self, gray_img):
        faces = self.cascade.detectMultiScale(
            gray_img,
            scaleFactor=self.scale_factor,
            minNeighbors=self.min_neighbors,
            minSize=self.min_size,
        )
        return faces
