from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from database import init_db
from routes import location, tracking

# Carpeta frontend/ (está un nivel arriba de backend/)
FRONTEND_DIR = Path(__file__).resolve().parent.parent / "frontend"


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Se ejecuta una vez al arrancar el servidor: crea las tablas si faltan
    init_db()
    yield


app = FastAPI(title="CurExpress", lifespan=lifespan)

app.include_router(location.router)
app.include_router(tracking.router)


@app.get("/api/health")
def health():
    return {"status": "ok", "app": "CurExpress"}


# Siempre al final: sirve la interfaz web (index.html, map.html, css, js...)
app.mount("/", StaticFiles(directory=FRONTEND_DIR, html=True), name="frontend")