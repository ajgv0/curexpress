// Menú lateral y barra superior compartidos por todas las pantallas.
// Se carga ANTES de script.js, para que los botones ya existan cuando script.js les asigne eventos.
(() => {
    const app = document.querySelector(".app");
    const contenido = document.querySelector(".app > .contenido");
    const principal = document.querySelector(".contenido-principal");
    if (!app || !contenido || !principal) return;

    const paginaActual = (location.pathname.split("/").pop() || "index.html").toLowerCase();

    const enlaces = [
        { titulo: "menuPrincipal", texto: "MENÚ PRINCIPAL" },
        { href: "index.html", vista: "inicio", i18n: "inicio", texto: "Inicio" },
        { href: "productos.html", vista: "productos", i18n: "productos", texto: "Productos" },
        { href: "carrito.html", vista: "carrito", i18n: "carrito", texto: "Carrito" },
        { href: "favoritos.html", vista: "favoritos", i18n: "favoritos", texto: "Favoritos" },
        { href: "membresia.html", vista: "membresia", i18n: "membresia", texto: "Membresía" },
        { titulo: "miCuenta", texto: "MI CUENTA" },
        { href: "perfil.html", vista: "perfil", i18n: "perfil", texto: "Mi perfil" },
        { href: "historial.html", vista: "historial", i18n: "historial", texto: "Historial de compras" },
        { href: "registro.html", vista: "registro", i18n: "crearCuenta", texto: "Crear cuenta" },
        { titulo: "administracion", texto: "ADMINISTRACIÓN" },
        { href: "inventario.html", vista: "inventario", i18n: "inventario", texto: "Inventario" },
        { href: "usuarios.html", vista: "usuarios", i18n: "usuarios", texto: "Administrar usuarios" },
        { titulo: "entregas", texto: "ENTREGAS" },
        {// aqui esta el link a la app de rastreo:
            href: "linkennnn",
            externo: true, i18n: "rastreo", texto: "Rastreo"
        },
        { href: "repartidor.html", vista: "repartidor", i18n: "chatRepartidor", texto: "Chat con repartidor" }
    ];

    const navHTML = enlaces.map((e) => {
        if (e.titulo) {
            return `<p class="menu-titulo" data-i18n="${e.titulo}">${e.texto}</p>`;
        }
        const activo = !e.externo && e.href === paginaActual ? " activo" : "";
        const extra = e.externo ? ' target="_blank" rel="noopener noreferrer"' : ` data-vista="${e.vista}"`;
        return `<a class="nav-btn${activo}" href="${e.href}"${extra} data-i18n="${e.i18n}">${e.texto}</a>`;
    }).join("\n");

    const menu = document.createElement("aside");
    menu.className = "menu-lateral contraido";
    menu.innerHTML = `
        <button type="button" class="boton-menu" id="botonMenu">☰</button>
        <div class="logo">
            <img src="images/placeholder.jpg" alt="Logo">
            <h2>CureXpress</h2>
        </div>
        <nav>${navHTML}</nav>`;

    const barra = document.createElement("header");
    barra.className = "barra-superior";
    barra.innerHTML = `
        <input type="text" placeholder="Buscar medicamentos..." data-i18n-placeholder="buscar">
        <div class="acciones-header">
            <button type="button" id="botonIdioma" aria-label="Cambiar idioma" data-i18n-aria="cambiarIdioma">ES</button>
            <button type="button" id="botonTema" aria-label="Cambiar tema" data-i18n-aria="cambiarTema">☾</button>
            <button type="button" id="botonPerfil" aria-label="Perfil de usuario" data-i18n-aria="perfilUsuario">
                <img src="images/profile.jpg" alt="Perfil">
            </button>
        </div>`;

    app.insertBefore(menu, contenido);
    contenido.insertBefore(barra, principal);
})();
