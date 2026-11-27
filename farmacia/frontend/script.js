const botones = document.querySelectorAll(".nav-btn");
const vistas = document.querySelectorAll(".vista");

botones.forEach((boton) => {
    boton.addEventListener("click", () => {
        if (boton.dataset.url) {
            window.open(boton.dataset.url, "_blank", "noopener,noreferrer");
            return;
        }

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
        nombre: "CureXpress",
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
        nombre: "CureXpress",
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


// PERFIL
// Los datos se guardan en este navegador (localStorage).

const formPerfil = document.getElementById("formPerfil");
const camposPerfil = document.getElementById("camposPerfil");
const botonEditar = document.getElementById("botonEditar");
const botonCancelar = document.getElementById("botonCancelar");
const botonGuardar = document.getElementById("botonGuardar");
const mensajePerfil = document.getElementById("mensajePerfil");
const inputFoto = document.getElementById("inputFoto");
const perfilFoto = document.getElementById("perfilFoto");
const botonPerfil = document.getElementById("botonPerfil");

// FUNCIONES DE ALMACENAMIENTO

function leerDato(clave) {
    try {
        return localStorage.getItem(clave);
    } catch (error) {
        return null;
    }
}

function guardarDato(clave, valor) {
    try {
        localStorage.setItem(clave, valor);
        return true;
    } catch (error) {
        return false;
    }
}

// MENSAJES

function mostrarMensaje(texto, esError = false) {
    if (!mensajePerfil) return;

    mensajePerfil.textContent = texto;
    mensajePerfil.classList.toggle("error", esError);
}

// CARGAR PERFIL

function cargarPerfil() {
    let datos = {};

    try {
        datos = JSON.parse(leerDato("perfil")) || {};
    } catch (error) {
        datos = {};
    }

    if (!formPerfil) return;

    formPerfil.querySelectorAll("input[name]").forEach((input) => {
        input.value = datos[input.name] || "";
    });

    document.getElementById("perfilNombre").textContent =
        datos.nombre || "Tu nombre";

    document.getElementById("perfilCorreo").textContent =
        datos.correo || "Agrega tu correo";
}

// CAMBIAR ESTADO DE EDICIÓN

function cambiarEdicion(editando) {
    camposPerfil.disabled = !editando;

    botonEditar.hidden = editando;
    botonCancelar.hidden = !editando;
    botonGuardar.hidden = !editando;
}

// EDITAR

botonEditar.addEventListener("click", () => {
    mostrarMensaje("");
    cambiarEdicion(true);

    formPerfil.elements.namedItem("nombre").focus();
});

// CANCELAR

botonCancelar.addEventListener("click", () => {
    cargarPerfil();
    cambiarEdicion(false);
    ocultarPassword();
    mostrarMensaje("");
});

// GUARDAR CAMBIOS

formPerfil.addEventListener("submit", (evento) => {
    evento.preventDefault();

    // Quitar espacios sobrantes
    formPerfil.querySelectorAll("input[name]").forEach((input) => {
        input.value = input.value.trim();
    });

    // Validar campos
    if (!formPerfil.reportValidity()) {
        mostrarMensaje("Revisa los campos obligatorios.", true);
        return;
    }

    // Obtener todos los datos del formulario
    const datos = Object.fromEntries(
        Array.from(
            formPerfil.querySelectorAll("input[name]"),
            (input) => [input.name, input.value]
        )
    );

    // Guardar en localStorage
    if (!guardarDato("perfil", JSON.stringify(datos))) {
        mostrarMensaje("No se pudieron guardar los cambios.", true);
        return;
    }

    // Actualizar información y regresar al estado inicial
    cargarPerfil();
    cambiarEdicion(false);
    ocultarPassword();

    mostrarMensaje("Perfil actualizado correctamente.");
});

// FOTO DE PERFIL

function ponerFoto(origen) {
    perfilFoto.src = origen;

    const imagenBoton = botonPerfil.querySelector("img");

    if (imagenBoton) {
        imagenBoton.src = origen;
    }
}

inputFoto.addEventListener("change", () => {
    const archivo = inputFoto.files[0];

    if (!archivo) return;

    const url = URL.createObjectURL(archivo);
    const imagen = new Image();

    imagen.onload = () => {

        // Recortar al centro y reducir a 256 x 256
        const lienzo = document.createElement("canvas");

        lienzo.width = 256;
        lienzo.height = 256;

        const lado = Math.min(imagen.width, imagen.height);
        const contexto = lienzo.getContext("2d");

        contexto.fillStyle = "white";
        contexto.fillRect(0, 0, 256, 256);

        contexto.drawImage(
            imagen,
            (imagen.width - lado) / 2,
            (imagen.height - lado) / 2,
            lado,
            lado,
            0,
            0,
            256,
            256
        );

        const foto = lienzo.toDataURL("image/jpeg", 0.85);

        ponerFoto(foto);
        URL.revokeObjectURL(url);

        if (guardarDato("fotoPerfil", foto)) {
            mostrarMensaje("Foto actualizada.");
        } else {
            mostrarMensaje(
                "La foto se cambió, pero no se pudo guardar.",
                true
            );
        }
    };

    imagen.onerror = () => {
        URL.revokeObjectURL(url);
        mostrarMensaje("Ese archivo no es una imagen válida.", true);
    };

    imagen.src = url;
    inputFoto.value = "";
});

// ACCESOS RÁPIDOS

function irAVista(nombre) {
    const boton = document.querySelector(
        `.nav-btn[data-vista="${nombre}"]`
    );

    if (boton) {
        boton.click();
    }
}

botonPerfil.addEventListener("click", () => {
    irAVista("perfil");
});

document.querySelectorAll("[data-ir]").forEach((boton) => {
    boton.addEventListener("click", () => {
        irAVista(boton.dataset.ir);
    });
});

// CONTRASEÑA

const botonVerPassword = document.getElementById("botonVerPassword");
const passwordPerfil = document.getElementById("passwordPerfil");

let passwordVisible = false;

function ocultarPassword() {
    if (passwordPerfil) {
        passwordPerfil.type = "password";
    }

    if (botonVerPassword) {
        botonVerPassword.textContent = "👁";
    }

    passwordVisible = false;
}

if (botonVerPassword) {
    botonVerPassword.addEventListener("click", () => {

        if (!passwordVisible) {

            const confirmar = confirm(
                "¿Deseas mostrar la contraseña?"
            );

            if (!confirmar) return;

            passwordPerfil.type = "text";
            botonVerPassword.textContent = "✕";
            passwordVisible = true;

        } else {
            ocultarPassword();
        }
    });
}

// ESTADO INICIAL

cargarPerfil();

if (leerDato("fotoPerfil")) {
    ponerFoto(leerDato("fotoPerfil"));
}
