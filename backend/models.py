from typing import Optional

from pydantic import BaseModel, Field


class LocationIn(BaseModel):
    """Datos que manda el celular en cada lectura de GPS.

    Si llega una latitud fuera de -90..90, una longitud fuera de -180..180
    o un valor negativo en precisión/velocidad, FastAPI responde 422
    y no se guarda nada.
    """

    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    accuracy: Optional[float] = Field(default=None, ge=0)  # metros
    speed: Optional[float] = Field(default=None, ge=0)  # metros por segundo
    # Milisegundos Unix que da el navegador (tope: año 2100)
    timestamp: Optional[int] = Field(default=None, ge=0, le=4102444800000)