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


// SISTEMA DE IDIOMAS

const traducciones = {
    es: {
        menuPrincipal: "MENÚ PRINCIPAL",
        inicio: "Inicio",
        productos: "Productos",
        carrito: "Carrito",
        favoritos: "Favoritos",
        membresia: "Membresía",
        miCuenta: "MI CUENTA",
        perfil: "Mi perfil",
        historial: "Historial de compras",
        administracion: "ADMINISTRACIÓN",
        inventario: "Inventario",
        usuarios: "Administrar usuarios",
        entregas: "ENTREGAS",
        rastreo: "Rastreo",
        chatRepartidor: "Chat con repartidor",
        buscar: "Buscar medicamentos...",

        bienvenida: "Bienvenido a nuestra farmacia",
        subBienvenida: "Encuentra los productos que necesitas.",
        destacados: "Productos destacados",

        productosTitulo: "Productos",
        productosDesc: "Aquí estará el catálogo completo de medicamentos.",
        carritoTitulo: "Mi carrito",
        carritoDesc: "Aquí aparecerán los productos que agregues.",
        favoritosTitulo: "Mis favoritos",
        favoritosDesc: "Aquí estarán tus productos favoritos.",
        membresiaTitulo: "Mi membresía",
        membresiaDesc: "Consulta los beneficios y opciones de membresía.",
        perfilTitulo: "Mi perfil",
        perfilDesc: "Información de tu cuenta y opciones de usuario.",
        historialTitulo: "Historial de compras",
        historialDesc: "Aquí aparecerán tus compras anteriores.",
        inventarioTitulo: "Inventario",
        inventarioDesc: "Administración de existencias de productos.",
        usuariosTitulo: "Administrar usuarios",
        usuariosDesc: "Gestión de cuentas y permisos.",
        rastreoTitulo: "Rastreo de pedido",
        rastreoDesc: "Función pendiente de desarrollo.",
        repartidorTitulo: "Chat con repartidor",
        repartidorDesc: "Función pendiente de desarrollo."
    },

    en: {
        menuPrincipal: "MAIN MENU",
        inicio: "Home",
        productos: "Products",
        carrito: "Cart",
        favoritos: "Favorites",
        membresia: "Membership",
        miCuenta: "MY ACCOUNT",
        perfil: "My profile",
        historial: "Purchase history",
        administracion: "ADMINISTRATION",
        inventario: "Inventory",
        usuarios: "Manage users",
        entregas: "DELIVERY",
        rastreo: "Order tracking",
        chatRepartidor: "Chat with driver",
        buscar: "Search medicines...",

        bienvenida: "Welcome to our pharmacy",
        subBienvenida: "Find the products you need.",
        destacados: "Featured products",

        productosTitulo: "Products",
        productosDesc: "The complete medicine catalog will appear here.",
        carritoTitulo: "My cart",
        carritoDesc: "The products you add will appear here.",
        favoritosTitulo: "My favorites",
        favoritosDesc: "Your favorite products will appear here.",
        membresiaTitulo: "My membership",
        membresiaDesc: "Check membership benefits and options.",
        perfilTitulo: "My profile",
        perfilDesc: "Your account information and user options.",
        historialTitulo: "Purchase history",
        historialDesc: "Your previous purchases will appear here.",
        inventarioTitulo: "Inventory",
        inventarioDesc: "Product stock management.",
        usuariosTitulo: "Manage users",
        usuariosDesc: "Account and permission management.",
        rastreoTitulo: "Order tracking",
        rastreoDesc: "Feature under development.",
        repartidorTitulo: "Chat with driver",
        repartidorDesc: "Feature under development."
    }
};

// Recuperar idioma guardado
let idiomaActual = localStorage.getItem("idioma") || "es";

const botonIdioma = document.getElementById("botonIdioma");

// Aplicar traducciones
function cambiarIdioma(idioma) {
    idiomaActual = idioma;

    document.querySelectorAll("[data-i18n]").forEach(elemento => {
        const clave = elemento.dataset.i18n;
        elemento.textContent = traducciones[idioma][clave];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(elemento => {
        const clave = elemento.dataset.i18nPlaceholder;
        elemento.placeholder = traducciones[idioma][clave];
    });

    botonIdioma.textContent = idioma.toUpperCase();

    document.documentElement.lang = idioma;

    localStorage.setItem("idioma", idioma);
}

// Cambiar entre español e inglés
botonIdioma.addEventListener("click", () => {
    const nuevoIdioma = idiomaActual === "es" ? "en" : "es";
    cambiarIdioma(nuevoIdioma);
});

// Aplicar idioma inicial
cambiarIdioma(idiomaActual);
