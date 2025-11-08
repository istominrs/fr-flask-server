import os
from datetime import timedelta

DATA_DIR = os.environ.get("DATA_DIR", "./data")
os.makedirs(DATA_DIR, exist_ok=True)

CASCADE_PATH = os.environ.get(
    "CASCADE_PATH",
    os.path.join(DATA_DIR, "haarcascade_frontalface_default.xml"),
)

if not os.path.exists(CASCADE_PATH):
    try:
        import urllib.request

        url = "https://raw.githubusercontent.com/opencv/opencv/master/data/haarcascades/haarcascade_frontalface_default.xml"
        urllib.request.urlretrieve(url, CASCADE_PATH)
    except Exception:
        pass

LBPH_THRESHOLD = float(os.environ.get("LBPH_THRESHOLD", "60.0"))
RE_ENQUEUE_COOLDOWN = timedelta(
    minutes=int(os.environ.get("RE_ENQUEUE_COOLDOWN_MIN", "10"))
)

FACES_DIR = os.path.join(DATA_DIR, "faces")
os.makedirs(FACES_DIR, exist_ok=True)

QUEUE_FILE = os.path.join(DATA_DIR, "queue.json")
PERSON_COUNTER_FILE = os.path.join(DATA_DIR, "person_counter.txt")
TICKET_COUNTER_FILE = os.path.join(DATA_DIR, "ticket_counter.txt")

for path, default in [
    (PERSON_COUNTER_FILE, "0"),
    (TICKET_COUNTER_FILE, "0"),
    (QUEUE_FILE, "[]"),
]:
    if not os.path.exists(path):
        with open(path, "w", encoding="utf-8") as f:
            f.write(default)
