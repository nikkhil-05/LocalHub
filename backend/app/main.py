from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import files, health, system

app = FastAPI(title="LocalHub")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[ "http://localhost:5173",
                    "http://192.168.1.7:5173",
                 ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(health.router)
app.include_router(system.router)
app.include_router(files.router)
