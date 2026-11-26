from fastapi import APIRouter

from database import get_connection
from utils import STALE_SECONDS, seconds_since, utc_now_iso

router = APIRouter(prefix="/api/tracking", tags=["tracking"])


@router.post("/start")
def start_tracking():
    """Inicia una sesión nueva. Si había una activa, la cierra primero."""
    conn = get_connection()
    try:
        now = utc_now_iso()
        conn.execute(
            "UPDATE tracking_sessions SET is_active = 0, ended_at = ? "
            "WHERE is_active = 1",
            (now,),
        )
        cur = conn.execute(
            "INSERT INTO tracking_sessions (started_at, is_active) VALUES (?, 1)",
            (now,),
        )
        conn.commit()
        return {"ok": True, "session_id": cur.lastrowid, "started_at": now}
    finally:
        conn.close()


@router.post("/stop")
def stop_tracking():
    """Finaliza la sesión activa (si existe)."""
    conn = get_connection()
    try:
        session = conn.execute(
            "SELECT id FROM tracking_sessions WHERE is_active = 1 "
            "ORDER BY id DESC LIMIT 1"
        ).fetchone()

        if session is None:
            return {"ok": True, "active": False, "message": "No había una sesión activa."}

        now = utc_now_iso()
        conn.execute(
            "UPDATE tracking_sessions SET is_active = 0, ended_at = ? WHERE id = ?",
            (now, session["id"]),
        )
        conn.commit()
        return {"ok": True, "active": False, "session_id": session["id"], "ended_at": now}
    finally:
        conn.close()


@router.get("/status")
def tracking_status():
    """Estado actual: si hay rastreo activo y si las coordenadas están al día."""
    conn = get_connection()
    try:
        session = conn.execute(
            "SELECT * FROM tracking_sessions WHERE is_active = 1 "
            "ORDER BY id DESC LIMIT 1"
        ).fetchone()

        if session is None:
            return {
                "active": False,
                "session_id": None,
                "started_at": None,
                "last_update": None,
                "has_location": False,
                "age_seconds": None,
                "stale": False,
            }

        last = conn.execute(
            "SELECT received_at FROM locations WHERE session_id = ? "
            "ORDER BY id DESC LIMIT 1",
            (session["id"],),
        ).fetchone()

        last_update = last["received_at"] if last else None
        # Si todavía no llega ninguna coordenada, contamos desde que inició
        age = seconds_since(last_update or session["started_at"])

        return {
            "active": True,
            "session_id": session["id"],
            "started_at": session["started_at"],
            "last_update": last_update,
            "has_location": last is not None,
            "age_seconds": round(age, 1),
            "stale": age > STALE_SECONDS,
        }
    finally:
        conn.close()