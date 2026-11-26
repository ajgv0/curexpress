from typing import Optional

from fastapi import APIRouter, HTTPException, Query

from database import get_connection
from models import LocationIn
from utils import STALE_SECONDS, ms_to_iso, seconds_since, utc_now_iso

router = APIRouter(prefix="/api/location", tags=["location"])


@router.post("")
def save_location(data: LocationIn):
    """Guarda una coordenada enviada por el celular."""
    conn = get_connection()
    try:
        session = conn.execute(
            "SELECT id FROM tracking_sessions WHERE is_active = 1 "
            "ORDER BY id DESC LIMIT 1"
        ).fetchone()

        if session is None:
            raise HTTPException(
                status_code=409,
                detail="No hay una sesión de rastreo activa. Inicia el rastreo primero.",
            )

        cur = conn.execute(
            "INSERT INTO locations "
            "(session_id, latitude, longitude, accuracy, speed, "
            "device_timestamp, received_at) "
            "VALUES (?, ?, ?, ?, ?, ?, ?)",
            (
                session["id"],
                data.latitude,
                data.longitude,
                data.accuracy,
                data.speed,
                ms_to_iso(data.timestamp),
                utc_now_iso(),
            ),
        )
        conn.commit()
        return {"ok": True, "id": cur.lastrowid, "session_id": session["id"]}
    finally:
        conn.close()


@router.get("/latest")
def latest_location():
    """Devuelve la última ubicación guardada y si ya está desactualizada."""
    conn = get_connection()
    try:
        row = conn.execute(
            "SELECT * FROM locations ORDER BY id DESC LIMIT 1"
        ).fetchone()

        if row is None:
            return {
                "location": None,
                "age_seconds": None,
                "reading_age_seconds": None,
                "stale": True,
            }

        location = dict(row)
        age = seconds_since(location["received_at"])
        reading_age = seconds_since(location["device_timestamp"])
        return {
            "location": location,
            "age_seconds": round(age, 1),
            # Edad de la lectura del GPS (hora del celular); puede ser None
            "reading_age_seconds": (
                None if reading_age is None else round(max(reading_age, 0), 1)
            ),
            "stale": age > STALE_SECONDS,
        }
    finally:
        conn.close()


@router.get("/history")
def location_history(
    limit: int = Query(100, ge=1, le=1000),
    session_id: Optional[int] = None,
):
    """Historial de ubicaciones, de la más antigua a la más reciente."""
    conn = get_connection()
    try:
        if session_id is None:
            rows = conn.execute(
                "SELECT * FROM locations ORDER BY id DESC LIMIT ?", (limit,)
            ).fetchall()
        else:
            rows = conn.execute(
                "SELECT * FROM locations WHERE session_id = ? "
                "ORDER BY id DESC LIMIT ?",
                (session_id, limit),
            ).fetchall()

        items = [dict(r) for r in reversed(rows)]
        return {"count": len(items), "locations": items}
    finally:
        conn.close()