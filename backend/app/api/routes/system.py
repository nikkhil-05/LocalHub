from fastapi import APIRouter

from app.services.system_service import get_system_info

router = APIRouter()


@router.get("/system")
def system():
    return get_system_info()