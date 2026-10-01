import os
from dataclasses import dataclass
from threading import Event, Lock
from typing import Any, Iterator

import cv2


class CameraUnavailableError(RuntimeError):
    """Raised when the configured camera cannot be opened or read."""


class CameraAlreadyStreamingError(RuntimeError):
    """Raised when a second viewer attempts to use the same camera."""


@dataclass
class CameraSession:
    capture: Any
    stop_event: Event


class CameraManager:
    """Own one server camera and its active MJPEG stream."""

    def __init__(self, device_index: int = 1):
        self.device_index = device_index
        self._lock = Lock()
        self._session: CameraSession | None = None

    def start(self) -> Iterator[bytes]:
        with self._lock:
            if self._session is not None:
                raise CameraAlreadyStreamingError

            capture = cv2.VideoCapture(self.device_index)
            if not capture.isOpened():
                capture.release()
                raise CameraUnavailableError("No server camera is available")

            success, first_frame = capture.read()
            if not success:
                capture.release()
                raise CameraUnavailableError("The server camera could not provide a frame")

            session = CameraSession(capture=capture, stop_event=Event())
            self._session = session

        return self._frames(session, first_frame)

    def stop(self) -> None:
        with self._lock:
            session = self._session
            if session is None:
                return

            session.stop_event.set()
            session.capture.release()
            self._session = None

    def _frames(self, session: CameraSession, frame) -> Iterator[bytes]:
        try:
            while not session.stop_event.is_set():
                encoded, jpeg = cv2.imencode(".jpg", frame)
                if encoded:
                    yield (
                        b"--frame\r\nContent-Type: image/jpeg\r\n\r\n"
                        + jpeg.tobytes()
                        + b"\r\n"
                    )

                if session.stop_event.is_set():
                    break
                success, frame = session.capture.read()
                if not success:
                    break
        finally:
            self._finish(session)

    def _finish(self, session: CameraSession) -> None:
        with self._lock:
            if self._session is session:
                session.stop_event.set()
                session.capture.release()
                self._session = None


camera_manager = CameraManager(device_index=int(os.getenv("LOCALHUB_CAMERA_INDEX", "1")))
