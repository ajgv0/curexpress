// Mapa en vivo: dibuja el kart y la telemetría con la última ubicación del servidor.
// Se usa solo en map.html.
(function () {
  const POLL_MS = 2000; // cada cuánto pregunta al servidor
  const START_ZOOM = 17; // zoom al recibir la primera ubicación
  const MAX_ACCURACY_CIRCLE_M = 200; // no dibuja el círculo si la precisión es peor
  const READING_WARN_S = 15; // lectura de GPS más vieja que esto = aviso ámbar
  const WARN_ACCURACY_M = 50; // precisión peor que esto = aviso ámbar
  const TRAIL_LIMIT = 500; // puntos máximos del rastro

  const followButton = document.getElementById("btn-follow");

  function byId(id) {
    return document.getElementById(id);
  }

  function setText(id, text, warn) {
    const el = byId(id);
    if (!el) return;
    el.textContent = text;
    el.className = warn ? "warn" : "";
  }

  // ---------- Mapa ----------
  // Vista inicial de México; se mueve al kart cuando llega la primera ubicación
  const map = L.map("map").setView([23.6345, -102.5528], 5);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const kartIcon = L.divIcon({
    className: "kart-marker",
    html: "<span></span>",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  const trail = L.polyline([], { color: "#e10600", weight: 4, opacity: 0.8 }).addTo(map);

  let marker = null;
  let accuracyCircle = null;
  let trailPoints = [];
  let currentSessionId = null;
  let followKart = true;
  let hasFirstFix = false;
  let busy = false;

  // ---------- Seguir al kart ----------
  function updateFollowButton() {
    followButton.textContent = "Seguir al pedido: " + (followKart ? "sí" : "no");
  }

  followButton.addEventListener("click", function () {
    followKart = !followKart;
    updateFollowButton();
    if (followKart && marker) map.panTo(marker.getLatLng());
  });

  // Si arrastras el mapa con el dedo o el mouse, deja de seguir al kart
  map.on("dragstart", function () {
    followKart = false;
    updateFollowButton();
  });

  // ---------- Rastro ----------
  function pushTrailPoint(lat, lon) {
    const last = trailPoints[trailPoints.length - 1];
    if (last && last[0] === lat && last[1] === lon) return; // sin movimiento
    trailPoints.push([lat, lon]);
    if (trailPoints.length > TRAIL_LIMIT) trailPoints.shift();
    trail.setLatLngs(trailPoints);
  }

  async function loadTrail(sessionId) {
    try {
      const response = await fetch(
        "/api/location/history?limit=" + TRAIL_LIMIT + "&session_id=" + sessionId,
        { cache: "no-store" }
      );
      if (!response.ok) return;
      const data = await response.json();
      data.locations.forEach(function (item) {
        pushTrailPoint(item.latitude, item.longitude);
      });
    } catch (error) {
      // Si falla, el rastro se arma con las lecturas nuevas
    }
  }

  // ---------- Dibujar el kart ----------
  function showOnMap(loc, isStale) {
    const latlng = [loc.latitude, loc.longitude];

    if (!marker) {
      marker = L.marker(latlng, { icon: kartIcon, keyboard: false }).addTo(map);
    } else {
      marker.setLatLng(latlng);
    }
    const markerEl = marker.getElement();
    if (markerEl) markerEl.classList.toggle("stale", isStale);

    if (accuracyCircle) {
      map.removeLayer(accuracyCircle);
      accuracyCircle = null;
    }
    if (loc.accuracy != null && loc.accuracy <= MAX_ACCURACY_CIRCLE_M) {
      accuracyCircle = L.circle(latlng, {
        radius: loc.accuracy,
        color: "#e10600",
        weight: 1,
        fillColor: "#e10600",
        fillOpacity: 0.12,
      }).addTo(map);
    }

    if (!hasFirstFix) {
      map.setView(latlng, START_ZOOM);
      hasFirstFix = true;
    } else if (followKart) {
      map.panTo(latlng);
    }
  }

  // ---------- Panel de telemetría ----------
  function showTelemetry(data) {
    const loc = data.location;

    setText("lat", loc.latitude.toFixed(6));
    setText("lon", loc.longitude.toFixed(6));

    if (loc.accuracy != null) {
      setText("accuracy", Math.round(loc.accuracy) + " m", loc.accuracy > WARN_ACCURACY_M);
    } else {
      setText("accuracy", "—");
    }

    // El servidor guarda la velocidad en m/s; aquí se muestra en km/h
    if (loc.speed != null) {
      setText("speed", (loc.speed * 3.6).toFixed(1) + " km/h");
    } else {
      setText("speed", "No disponible");
    }

    if (data.reading_age_seconds != null) {
      setText(
        "reading-age",
        "hace " + Math.round(data.reading_age_seconds) + " s",
        data.reading_age_seconds > READING_WARN_S
      );
    } else {
      setText("reading-age", "—");
    }
  }

  // ---------- Consulta periódica ----------
  async function refreshLocation() {
    if (busy) return;
    busy = true;
    try {
      const response = await fetch("/api/location/latest", { cache: "no-store" });
      if (!response.ok) throw new Error("HTTP " + response.status);
      const data = await response.json();
      if (!data.location) return;

      // Sesión nueva (o primera carga): arma el rastro desde el historial
      if (data.location.session_id !== currentSessionId) {
        currentSessionId = data.location.session_id;
        trailPoints = [];
        trail.setLatLngs([]);
        await loadTrail(currentSessionId);
      }

      pushTrailPoint(data.location.latitude, data.location.longitude);
      showOnMap(data.location, data.stale);
      showTelemetry(data);
    } catch (error) {
      // Si el servidor no responde, status.js muestra "Sin conexión"
    } finally {
      busy = false;
    }
  }

  refreshLocation();
  setInterval(refreshLocation, POLL_MS);
})();