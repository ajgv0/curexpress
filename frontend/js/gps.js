// Lógica del rastreador: pide permiso de ubicación, lee el GPS y envía
// las coordenadas al servidor. Se usa solo en index.html.
(function () {
  const MIN_SEND_MS = 2000; // máximo una lectura enviada cada 2 segundos
  const KEEPALIVE_MS = 5000; // si no hay lectura nueva, reenvía la última cada 5 s
  const CHECK_MS = 1000; // cada cuánto revisa si toca reenviar

  const startButton = document.getElementById("btn-start");
  const stopButton = document.getElementById("btn-stop");

  let watchId = null;
  let keepAliveId = null;
  let lastPosition = null;
  let lastSentAt = 0;
  let sending = false;
  let wakeLock = null;

  function byId(id) {
    return document.getElementById(id);
  }

  function setText(id, text) {
    const el = byId(id);
    if (el) el.textContent = text;
  }

  function setGps(state, text) {
    const dot = byId("gps-dot");
    if (dot) dot.className = "dot " + state;
    setText("gps-text", text);
  }

  function showMessage(text, isError) {
    const el = byId("gps-message");
    if (!el) return;
    el.textContent = text;
    el.className = "hint" + (isError ? " error" : "");
  }

  function showReadout(coords) {
    setText("gps-lat", coords.latitude.toFixed(6));
    setText("gps-lon", coords.longitude.toFixed(6));
    setText("gps-accuracy", Math.round(coords.accuracy) + " m");
    const hasSpeed = Number.isFinite(coords.speed) && coords.speed >= 0;
    // El navegador da la velocidad en m/s; aquí se muestra en km/h
    setText("gps-speed", hasSpeed ? (coords.speed * 3.6).toFixed(1) + " km/h" : "No disponible");
  }

  function clearReadout() {
    ["gps-lat", "gps-lon", "gps-accuracy", "gps-speed"].forEach(function (id) {
      setText(id, "—");
    });
  }

  // ---------- Pantalla encendida ----------
  async function requestWakeLock() {
    try {
      if ("wakeLock" in navigator) {
        wakeLock = await navigator.wakeLock.request("screen");
      }
    } catch (error) {
      // Si no se puede, el rastreo sigue funcionando igual
    }
  }

  function releaseWakeLock() {
    if (wakeLock) {
      wakeLock.release().catch(function () {});
      wakeLock = null;
    }
  }

  // El navegador libera el bloqueo si cambias de pestaña; se pide otra vez al volver
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && watchId !== null) {
      requestWakeLock();
    }
  });

  // ---------- Envío al servidor ----------
  async function sendLatest() {
    if (!lastPosition || sending) return;
    sending = true;
    lastSentAt = Date.now();

    const coords = lastPosition.coords;
    const body = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy,
      speed: Number.isFinite(coords.speed) && coords.speed >= 0 ? coords.speed : null,
      timestamp: lastPosition.timestamp,
    };

    try {
      const response = await fetch("/api/location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.status === 409) {
        await stopTracking(false);
        showMessage(
          "La sesión ya no está activa en el servidor. Presiona «Iniciar rastreo» otra vez.",
          true
        );
        return;
      }
      if (!response.ok) throw new Error("HTTP " + response.status);

      showMessage("Enviando ubicación al servidor…", false);
    } catch (error) {
      showMessage("Sin conexión con el servidor. Reintentando…", true);
    } finally {
      sending = false;
    }
  }

  function keepAlive() {
    if (lastPosition && Date.now() - lastSentAt >= KEEPALIVE_MS) {
      sendLatest();
    }
  }

  // ---------- Lecturas del GPS ----------
  function onPosition(position) {
    lastPosition = position;
    setGps("ok", "GPS activo");
    showReadout(position.coords);
    if (Date.now() - lastSentAt >= MIN_SEND_MS) {
      sendLatest();
    }
  }

  function onGpsError(error) {
    if (error.code === error.PERMISSION_DENIED) {
      stopTracking(true).then(function () {
        showMessage(
          "Permiso de ubicación denegado. Actívalo con el candado de la barra de direcciones y vuelve a intentar.",
          true
        );
      });
      return;
    }

    setGps("bad", "Sin señal GPS");
    if (error.code === error.POSITION_UNAVAILABLE) {
      showMessage("No se pudo obtener la ubicación (señal no disponible). Seguimos intentando.", true);
    } else {
      showMessage("El GPS tardó demasiado en responder. Seguimos intentando.", true);
    }
  }

  // ---------- Iniciar y detener ----------
  async function startTracking() {
    if (!window.isSecureContext) {
      showMessage(
        "Chrome bloquea el GPS en páginas sin HTTPS. Activa la excepción de Chrome (chrome://flags) o usa HTTPS.",
        true
      );
      return;
    }

    if (!("geolocation" in navigator)) {
      showMessage("Este navegador no soporta geolocalización.", true);
      return;
    }

    startButton.disabled = true;
    showMessage("Iniciando sesión de rastreo…", false);

    try {
      const response = await fetch("/api/tracking/start", { method: "POST" });
      if (!response.ok) throw new Error("HTTP " + response.status);
    } catch (error) {
      startButton.disabled = false;
      showMessage("No se pudo conectar con el servidor.", true);
      return;
    }

    stopButton.disabled = false;
    lastPosition = null;
    lastSentAt = 0;
    setGps("idle", "Buscando señal…");
    showMessage("Acepta el permiso de ubicación cuando el navegador lo pida.", false);

    watchId = navigator.geolocation.watchPosition(onPosition, onGpsError, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 15000,
    });
    keepAliveId = setInterval(keepAlive, CHECK_MS);
    requestWakeLock();
  }

  async function stopTracking(notifyServer) {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
    }
    if (keepAliveId !== null) {
      clearInterval(keepAliveId);
      keepAliveId = null;
    }
    releaseWakeLock();
    lastPosition = null;

    startButton.disabled = false;
    stopButton.disabled = true;
    setGps("idle", "Inactivo");
    clearReadout();

    if (notifyServer) {
      try {
        await fetch("/api/tracking/stop", { method: "POST" });
        showMessage("Rastreo detenido.", false);
      } catch (error) {
        showMessage("Se detuvo el GPS, pero no se pudo avisar al servidor.", true);
      }
    }
  }

  startButton.addEventListener("click", startTracking);
  stopButton.addEventListener("click", function () {
    stopTracking(true);
  });
})();