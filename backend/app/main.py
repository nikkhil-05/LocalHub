import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import camera, files, health, system
from app.services.camera_service import camera_manager


@asynccontextmanager
async def lifespan(_app: FastAPI):
    yield
    camera_manager.stop()


app = FastAPI(title="LocalHub", lifespan=lifespan)


allowed_origins = [
    origin.strip()
    for origin in os.getenv(
        "LOCALHUB_CORS_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173,http://192.168.1.7:5173",
    ).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(health.router)
app.include_router(system.router)
app.include_router(files.router)
app.include_router(camera.router)
