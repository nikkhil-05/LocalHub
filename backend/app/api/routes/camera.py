from fastapi import APIRouter, HTTPException, status
from fastapi.responses import StreamingResponse

from app.services.camera_service import (
    CameraAlreadyStreamingError,
    CameraUnavailableError,
    camera_manager,
)


router = APIRouter(prefix="/camera", tags=["Camera"])


@router.get("/stream", summary="Stream the server camera")
def stream_camera():
    try:
        frames = camera_manager.start()
    except CameraAlreadyStreamingError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="The server camera is already streaming",
        ) from exc
    except CameraUnavailableError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(exc),
        ) from exc

    return StreamingResponse(
        frames,
        media_type="multipart/x-mixed-replace; boundary=frame",
        headers={
            "Cache-Control": "no-store, no-cache, must-revalidate",
            "Pragma": "no-cache",
            "X-Accel-Buffering": "no",
        },
    )


@router.delete("/stream", summary="Stop the server camera stream")
def stop_camera():
    camera_manager.stop()
    return {"status": "stopped"}
