import json
import os
import threading
from datetime import datetime
from typing import List, Tuple, Optional

from config import FACES_DIR, PERSON_COUNTER_FILE, QUEUE_FILE, RE_ENQUEUE_COOLDOWN, TICKET_COUNTER_FILE

_lock = threading.RLock()

try:
    import fcntl


    def _flock(f):
        fcntl.flock(f.fileno(), fcntl.LOCK_EX)


    def _funlock(f):
        fcntl.flock(f.fileno(), fcntl.LOCK_UN)
except Exception:
    try:
        import msvcrt  # type: ignore


        def _flock(f):
            msvcrt.locking(f.fileno(), msvcrt.LK_LOCK, 1)


        def _funlock(f):
            msvcrt.locking(f.fileno(), msvcrt.LK_UNLCK, 1)
    except Exception:
        def _flock(f):
            return None


        def _funlock(f):
            return None


def _write_text_atomic(path: str, data: str):
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        f.write(data)
    os.replace(tmp, path)


def _inc_counter(path: str) -> int:
    with _lock:
        with open(path, "r+", encoding="utf-8") as f:
            _flock(f)
            try:
                raw = f.read().strip() or "0"
                val = int(raw) + 1
                f.seek(0)
                f.truncate()
                f.write(str(val))
                return val
            finally:
                _funlock(f)


def _ensure_person_dir(person_id: int) -> str:
    d = os.path.join(FACES_DIR, str(person_id))
    os.makedirs(d, exist_ok=True)
    return d


def create_person() -> int:
    pid = _inc_counter(PERSON_COUNTER_FILE)
    _ensure_person_dir(pid)
    return pid


def add_face_sample(person_id: int, img_bytes: bytes) -> None:
    person_dir = _ensure_person_dir(person_id)
    name = f"{datetime.now().strftime('%Y%m%dT%H%M%S_%f')}.png"
    with open(os.path.join(person_dir, name), "wb") as f:
        f.write(img_bytes)


def get_face_samples() -> List[Tuple[int, bytes]]:
    out: List[Tuple[int, bytes]] = []
    if not os.path.exists(FACES_DIR):
        return out
    for person in os.listdir(FACES_DIR):
        pdir = os.path.join(FACES_DIR, person)
        if not os.path.isdir(pdir):
            continue
        try:
            pid = int(person)
        except ValueError:
            continue
        for fn in sorted(os.listdir(pdir)):
            if not fn.lower().endswith(".png"):
                continue
            with open(os.path.join(pdir, fn), "rb") as f:
                out.append((pid, f.read()))
    return out


def _read_queue() -> list:
    with _lock:
        with open(QUEUE_FILE, "r", encoding="utf-8") as f:
            _flock(f)
            try:
                raw = f.read() or "[]"
                return json.loads(raw)
            finally:
                _funlock(f)


def _write_queue(entries: list):
    data = json.dumps(entries, ensure_ascii=False)
    _write_text_atomic(QUEUE_FILE, data)


def last_queue_time(person_id: int) -> Optional[datetime]:
    entries = _read_queue()
    for e in reversed(entries):
        if e.get("person_id") == person_id:
            return datetime.fromisoformat(e["created_at"])
    return None


def is_person_currently_queued(person_id: int) -> bool:
    entries = _read_queue()
    return any(e.get("person_id") == person_id and e.get("status") == "queued" for e in entries)


def enqueue_if_allowed(person_id: int) -> Optional[int]:
    if is_person_currently_queued(person_id):
        return None
    last = last_queue_time(person_id)
    if last and (datetime.now() - last) < RE_ENQUEUE_COOLDOWN:
        return None

    ticket_id = _inc_counter(TICKET_COUNTER_FILE)
    entry = {
        "id": ticket_id,
        "person_id": person_id,
        "created_at": datetime.now().isoformat(),
        "status": "queued",
    }
    entries = _read_queue()
    entries.append(entry)
    _write_queue(entries)
    return ticket_id


def set_ticket_status(ticket_id: int, status: str) -> bool:
    entries = _read_queue()
    changed = False
    for e in entries:
        if e.get("id") == ticket_id:
            e["status"] = status
            changed = True
            break
    if changed:
        _write_queue(entries)
    return changed


def get_next_queued_entry() -> Optional[dict]:
    entries = _read_queue()
    for e in entries:
        if e.get("status") == "queued":
            return e
    return None


def call_next_ticket() -> Optional[dict]:
    entries = _read_queue()
    for e in entries:
        if e.get("status") == "queued":
            e["status"] = "called"
            e["called_at"] = datetime.utcnow().isoformat()
            _write_queue(entries)
            return e
    return None
