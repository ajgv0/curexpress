// Consulta el estado del servidor cada 2 segundos y actualiza los indicadores.
// Lo usan index.html y map.html; si un elemento no existe en la página, se ignora.

const POLL_MS = 2000;

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setDot(id, state) {
  const el = document.getElementById(id);
  if (el) el.className = "dot " + state;
}

function setAlert(visible) {
  const el = document.getElementById("stale-alert");
  if (el) el.hidden = !visible;
}

function formatLocalTime(iso) {
  // El servidor guarda las fechas en UTC; aquí se muestran en tu hora local
  return new Date(iso).toLocaleTimeString("es-MX");
}

async function refreshStatus() {
  try {
    const response = await fetch("/api/tracking/status", { cache: "no-store" });
    if (!response.ok) throw new Error("HTTP " + response.status);
    const status = await response.json();

    setDot("server-dot", "ok");
    setText("server-text", "Conectado");

    setText(
      "last-update",
      status.last_update ? formatLocalTime(status.last_update) : "—"
    );

    if (!status.active) {
      setDot("tracking-dot", "idle");
      setText("tracking-text", "Detenido");
      setAlert(false);
    } else if (status.stale) {
      setDot("tracking-dot", "bad");
      setText("tracking-text", "Ubicación desactualizada");
      setAlert(true);
    } else {
      setDot("tracking-dot", "ok");
      setText("tracking-text", "Activo");
      setAlert(false);
    }
  } catch (error) {
    setDot("server-dot", "bad");
    setText("server-text", "Sin conexión");
    setDot("tracking-dot", "idle");
    setText("tracking-text", "Desconocido");
  }
}

refreshStatus();
setInterval(refreshStatus, POLL_MS);