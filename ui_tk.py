import threading
import tkinter as tk
from tkinter import messagebox
from dataclasses import dataclass
import requests

CLIENT = "http://127.0.0.1:8080"
SERVER = "http://127.0.0.1:8080"


@dataclass
class TicketEntry:
    id: int
    person_id: int
    status: str
    created_at: str
    called_at: str | None = None


class QueueUI:
    def __init__(self, root: tk.Tk):
        self.root = root
        self.root.title("Face Queue — Оператор")

        self.next_entry: TicketEntry | None = None
        self.current_called: TicketEntry | None = None

        self.lbl_next = tk.Label(root, text="Следующий: —", font=("Arial", 16))
        self.lbl_next.pack(padx=16, pady=8)

        frm = tk.Frame(root)
        frm.pack(padx=16, pady=8)

        self.btn_refresh = tk.Button(frm, text="Обновить 'следующего'", width=22, command=self.refresh_next)
        self.btn_refresh.grid(row=0, column=0, padx=6, pady=6)

        self.btn_call = tk.Button(frm, text="Позвать следующего", width=22, command=self.call_next)
        self.btn_call.grid(row=0, column=1, padx=6, pady=6)

        self.lbl_called = tk.Label(root, text="Текущий вызванный: —", font=("Arial", 14))
        self.lbl_called.pack(padx=16, pady=8)

        frm2 = tk.Frame(root)
        frm2.pack(padx=16, pady=8)

        self.btn_done = tk.Button(frm2, text="Отметить как обслуженного", width=28, command=self.mark_done)
        self.btn_done.grid(row=0, column=0, padx=6, pady=6)

        self.btn_clear = tk.Button(frm2, text="Сбросить текущего", width=20, command=self.clear_current)
        self.btn_clear.grid(row=0, column=1, padx=6, pady=6)

        self.root.after(1000, self.refresh_next)

    @classmethod
    def _get_next(cls):
        r = requests.get(f"{SERVER}/queue/next", timeout=5)
        if r.status_code == 200:
            data = r.json()
            if data.get("available") and data.get("entry"):
                e = data["entry"]
                return TicketEntry(
                    id=e["id"],
                    person_id=e["person_id"],
                    status=e["status"],
                    created_at=e["created_at"],
                    called_at=e.get("called_at"),
                )
        return None

    @classmethod
    def _call_next(cls):
        server_response = requests.post(f"{SERVER}/queue/call_next", timeout=5)
        if server_response.status_code == 204:
            return None
        if server_response.status_code != 200:
            raise RuntimeError(f"HTTP {server_response.status_code}: {server_response.text}")

        data = server_response.json()
        e = data.get("entry")
        if not e:
            raise RuntimeError("No 'entry' in server response")

        try:
            client_response = requests.post(
                f"{CLIENT}/queue/call_next",
                json={"ticket_id": e["id"]},
                timeout=5,
            )
            if client_response.status_code != 200:
                raise RuntimeError(f"HTTP {client_response.status_code}: {client_response.text}")
        except Exception as ex:
            raise RuntimeError(f"Client notify failed: {ex}") from ex

        return TicketEntry(
            id=e["id"],
            person_id=e["person_id"],
            status=e["status"],
            created_at=e["created_at"],
            called_at=e.get("called_at"),
        )

    @classmethod
    def _set_status(cls, ticket_id: int, status: str):
        r = requests.post(
            f"{SERVER}/tickets/{ticket_id}/status",
            json={"status": status},
            timeout=5,
        )
        if r.status_code != 200:
            raise RuntimeError(f"HTTP {r.status_code}: {r.text}")

    def refresh_next(self):
        def work():
            try:
                entry = self._get_next()
                self.next_entry = entry
                self._update_labels()
            except Exception as e:
                self._show_error(e)

        threading.Thread(target=work, daemon=True).start()
        self.root.after(3000, self.refresh_next)

    def call_next(self):
        def work():
            try:
                entry = self._call_next()
                if entry is None:
                    messagebox.showinfo("Очередь", "Очередь пуста.")
                else:
                    self.current_called = entry
                    self.next_entry = None
                self._update_labels()
            except Exception as e:
                self._show_error(e)

        threading.Thread(target=work, daemon=True).start()

    def mark_done(self):
        if not self.current_called:
            messagebox.showwarning("Нет текущего", "Сначала позовите кого-то.")
            return

        def work():
            try:
                self._set_status(self.current_called.id, "done")
                messagebox.showinfo("Готово", f"Билет {self.current_called.id} отмечен как 'done'.")
                self.current_called = None
                self._update_labels()
            except Exception as e:
                self._show_error(e)

        threading.Thread(target=work, daemon=True).start()

    def clear_current(self):
        self.current_called = None
        self._update_labels()

    def _update_labels(self):
        if self.next_entry:
            self.lbl_next.config(
                text=f"Следующий: ticket #{self.next_entry.id}  (person {self.next_entry.person_id})"
            )
        else:
            self.lbl_next.config(text="Следующий: —")

        if self.current_called:
            self.lbl_called.config(
                text=f"Текущий вызванный: ticket #{self.current_called.id}  (person {self.current_called.person_id})"
            )
        else:
            self.lbl_called.config(text="Текущий вызванный: —")

    @classmethod
    def _show_error(cls, e: Exception):
        messagebox.showerror("Ошибка", str(e))


if __name__ == "__main__":
    root = tk.Tk()
    app = QueueUI(root)
    root.mainloop()
