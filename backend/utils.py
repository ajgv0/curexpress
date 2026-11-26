from datetime import datetime, timezone

# Si pasan más de estos segundos sin recibir coordenadas,
# la ubicación se considera desactualizada.
STALE_SECONDS = 15


def utc_now_iso():
    """Fecha y hora actual en UTC, como texto (ej. 2026-11-25T18:30:00.123+00:00)."""
    return datetime.now(timezone.utc).isoformat(timespec="milliseconds")


def seconds_since(iso_text):
    """Segundos transcurridos desde una fecha guardada como texto."""
    if not iso_text:
        return None
    then = datetime.fromisoformat(iso_text)
    return (datetime.now(timezone.utc) - then).total_seconds()


def ms_to_iso(ms):
    """Convierte milisegundos Unix (lo que da el navegador) a texto ISO en UTC."""
    if ms is None:
        return None
    return datetime.fromtimestamp(ms / 1000, tz=timezone.utc).isoformat(
        timespec="milliseconds"
    )