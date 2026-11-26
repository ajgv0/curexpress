const botones = document.querySelectorAll(".nav-btn");
const vistas = document.querySelectorAll(".vista");

botones.forEach((boton) => {
    boton.addEventListener("click", () => {

        const destino = boton.dataset.vista;

        // Ocultar todas las pantallas
        vistas.forEach((vista) => {
            vista.classList.remove("activa");
        });

        // Mostrar la pantalla seleccionada
        document.getElementById(destino).classList.add("activa");

        // Actualizar el botón seleccionado
        botones.forEach((elemento) => {
            elemento.classList.remove("activo");
        });

        boton.classList.add("activo");
    });
});

const botonMenu = document.getElementById("botonMenu");
const menuLateral = document.querySelector(".menu-lateral");

botonMenu.addEventListener("click", () => {
    menuLateral.classList.toggle("contraido");
});


// MODO OSCURO

const botonTema = document.getElementById("botonTema");

// Recuperar la preferencia guardada
const temaGuardado = localStorage.getItem("tema");

if (temaGuardado === "oscuro") {
    document.body.classList.add("modo-oscuro");
    botonTema.textContent = "☀";
}

botonTema.addEventListener("click", () => {

    document.body.classList.toggle("modo-oscuro");

    const modoOscuro = document.body.classList.contains("modo-oscuro");

    if (modoOscuro) {
        botonTema.textContent = "☀";
        localStorage.setItem("tema", "oscuro");
    } else {
        botonTema.textContent = "☾";
        localStorage.setItem("tema", "claro");
    }

});

// TRADUCCIÓN

const traducciones = {
    es: {
        menuPrincipal: "MENÚ PRINCIPAL", inicio: "Inicio", productos: "Productos", carrito: "Carrito", favoritos: "Favoritos", membresia: "Membresía", farmacia: "Farmacia",
        miCuenta: "MI CUENTA", perfil: "Mi perfil", historial: "Historial de compras", administracion: "ADMINISTRACIÓN", inventario: "Inventario", usuarios: "Administrar usuarios",
        entregas: "ENTREGAS", rastreo: "Rastreo", chatRepartidor: "Chat con repartidor", buscar: "Buscar medicamentos...",
        cambiarIdioma: "Cambiar idioma", cambiarTema: "Cambiar tema", perfilUsuario: "Perfil de usuario",
        bienvenida: "Bienvenido a nuestra farmacia", subBienvenida: "Encuentra los productos que necesitas.", destacados: "Productos destacados",
        paracetamol: "Paracetamol", ibuprofeno: "Ibuprofeno", loratadina: "Loratadina", agregarCarrito: "Agregar al carrito",
        tituloCarrito: "Mi carrito", textoProductos: "Aquí estará el catálogo completo de medicamentos.", textoCarrito: "Aquí aparecerán los productos que agregues.",
        tituloFavoritos: "Mis favoritos", textoFavoritos: "Aquí estarán tus productos favoritos.", tituloMembresia: "Mi membresía", textoMembresia: "Consulta los beneficios y opciones de membresía.",
        tituloPerfil: "Mi perfil", textoPerfil: "Información de tu cuenta y opciones de usuario.", tituloHistorial: "Historial de compras", textoHistorial: "Aquí aparecerán tus compras anteriores.",
        tituloInventario: "Inventario", textoInventario: "Administración de existencias de productos.", tituloUsuarios: "Administrar usuarios", textoUsuarios: "Gestión de cuentas y permisos.",
        tituloRastreo: "Rastreo de pedido", tituloRepartidor: "Chat con repartidor", textoPendiente: "Función pendiente de desarrollo."
    },
    en: {
        menuPrincipal: "MAIN MENU", inicio: "Home", productos: "Products", carrito: "Cart", favoritos: "Favorites", membresia: "Membership", farmacia: "Pharmacy",
        miCuenta: "MY ACCOUNT", perfil: "My profile", historial: "Purchase history", administracion: "ADMINISTRATION", inventario: "Inventory", usuarios: "Manage users",
        entregas: "DELIVERY", rastreo: "Tracking", chatRepartidor: "Chat with courier", buscar: "Search medicines...",
        cambiarIdioma: "Change language", cambiarTema: "Change theme", perfilUsuario: "User profile",
        bienvenida: "Welcome to our pharmacy", subBienvenida: "Find the products you need.", destacados: "Featured products",
        paracetamol: "Paracetamol", ibuprofeno: "Ibuprofen", loratadina: "Loratadine", agregarCarrito: "Add to cart",
        tituloCarrito: "My cart", textoProductos: "The complete medicine catalog will be here.", textoCarrito: "The products you add will appear here.",
        tituloFavoritos: "My favorites", textoFavoritos: "Your favorite products will be here.", tituloMembresia: "My membership", textoMembresia: "Check membership benefits and options.",
        tituloPerfil: "My profile", textoPerfil: "Your account information and user options.", tituloHistorial: "Purchase history", textoHistorial: "Your previous purchases will appear here.",
        tituloInventario: "Inventory", textoInventario: "Product stock management.", tituloUsuarios: "Manage users", textoUsuarios: "Account and permission management.",
        tituloRastreo: "Order tracking", tituloRepartidor: "Chat with courier", textoPendiente: "Feature under development."
    }
};

const botonIdioma = document.getElementById("botonIdioma");
let idiomaActual = localStorage.getItem("idioma") || "es";

function aplicarIdioma(idioma) {
    document.documentElement.lang = idioma;

    document.querySelectorAll("[data-i18n]").forEach((elemento) => {
        const clave = elemento.dataset.i18n;
        if (traducciones[idioma][clave]) elemento.textContent = traducciones[idioma][clave];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((elemento) => {
        const clave = elemento.dataset.i18nPlaceholder;
        if (traducciones[idioma][clave]) elemento.placeholder = traducciones[idioma][clave];
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((elemento) => {
        const clave = elemento.dataset.i18nAria;
        if (traducciones[idioma][clave]) elemento.setAttribute("aria-label", traducciones[idioma][clave]);
    });

    botonIdioma.textContent = idioma === "es" ? "ES" : "EN";
    localStorage.setItem("idioma", idioma);
}

botonIdioma.addEventListener("click", () => {
    idiomaActual = idiomaActual === "es" ? "en" : "es";
    aplicarIdioma(idiomaActual);
});

aplicarIdioma(idiomaActual);
