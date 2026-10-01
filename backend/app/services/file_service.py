from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[3]
FILES_DIR = BASE_DIR / "files"

FILES_DIR.mkdir(exist_ok=True)


def resolve_path(relative_path: str = "") -> Path:
    """
    Resolve a user-supplied path inside the LocalHub files directory.

    Prevents paths such as:
        ../../secret.txt
        ../
    from escaping FILES_DIR.
    """

    requested_path = (FILES_DIR / relative_path).resolve()

    if requested_path != FILES_DIR and FILES_DIR not in requested_path.parents:
        raise ValueError("Invalid file path")

    return requested_path


def list_files(relative_path: str = ""):
    directory = resolve_path(relative_path)

    if not directory.exists():
        raise FileNotFoundError("Directory not found")

    if not directory.is_dir():
        raise NotADirectoryError("Path is not a directory")

    items = []

    for item in directory.iterdir():
        items.append(
            {
                "name": item.name,
                "type": "directory" if item.is_dir() else "file",
                "size": item.stat().st_size if item.is_file() else None,
            }
        )

    return items


def save_file(
    filename: str,
    content: bytes,
    relative_path: str = "",
):
    directory = resolve_path(relative_path)

    if not directory.exists():
        raise FileNotFoundError("Directory not found")

    if not directory.is_dir():
        raise NotADirectoryError("Path is not a directory")

    file_path = resolve_path(
        str(Path(relative_path) / filename)
    )

    file_path.write_bytes(content)

    return {
        "name": file_path.name,
        "type": "file",
        "size": len(content),
    }


def create_directory(
    name: str,
    relative_path: str = "",
):
    directory = resolve_path(relative_path)

    if not directory.exists():
        raise FileNotFoundError("Parent directory not found")

    if not directory.is_dir():
        raise NotADirectoryError("Parent path is not a directory")

    new_directory = resolve_path(
        str(Path(relative_path) / name)
    )

    if new_directory.exists():
        raise FileExistsError("Directory already exists")

    new_directory.mkdir()

    return {
        "name": new_directory.name,
        "type": "directory",
    }


def get_file_path(relative_path: str):
    file_path = resolve_path(relative_path)

    if not file_path.exists() or not file_path.is_file():
        return None

    return file_path


def delete_path(relative_path: str):
    path = resolve_path(relative_path)

    if not path.exists():
        return False

    if path.is_dir():
        path.rmdir()
    else:
        path.unlink()

    return True