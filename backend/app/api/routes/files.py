from fastapi import APIRouter, File, HTTPException, Query, UploadFile
from fastapi.responses import FileResponse

from app.services.file_service import (
    create_directory,
    delete_path,
    get_file_path,
    list_files,
    save_file,
)


router = APIRouter(
    prefix="/files",
    tags=["Files"],
)


@router.get("")
def get_files(
    path: str = Query(default=""),
):
    try:
        return list_files(path)

    except FileNotFoundError:
        raise HTTPException(
            status_code=404,
            detail="Directory not found",
        )

    except NotADirectoryError:
        raise HTTPException(
            status_code=400,
            detail="Path is not a directory",
        )

    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid path",
        )


@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    path: str = Query(default=""),
):
    try:
        content = await file.read()

        return save_file(
            filename=file.filename,
            content=content,
            relative_path=path,
        )

    except FileNotFoundError:
        raise HTTPException(
            status_code=404,
            detail="Directory not found",
        )

    except NotADirectoryError:
        raise HTTPException(
            status_code=400,
            detail="Path is not a directory",
        )

    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid path",
        )


@router.post("/folder")
def create_folder(
    name: str,
    path: str = Query(default=""),
):
    try:
        return create_directory(
            name=name,
            relative_path=path,
        )

    except FileNotFoundError:
        raise HTTPException(
            status_code=404,
            detail="Parent directory not found",
        )

    except NotADirectoryError:
        raise HTTPException(
            status_code=400,
            detail="Parent path is not a directory",
        )

    except FileExistsError:
        raise HTTPException(
            status_code=409,
            detail="Directory already exists",
        )

    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid path",
        )


@router.get("/download")
def download_file(path: str):
    try:
        file_path = get_file_path(path)

        if file_path is None:
            raise HTTPException(
                status_code=404,
                detail="File not found",
            )

        return FileResponse(
            path=file_path,
            filename=file_path.name,
        )

    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid path",
        )


@router.delete("")
def remove_path(path: str):
    try:
        deleted = delete_path(path)

        if not deleted:
            raise HTTPException(
                status_code=404,
                detail="Path not found",
            )

        return {
            "message": "Deleted successfully",
            "path": path,
        }

    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid path",
        )