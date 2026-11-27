
// ==========================================
// ELEMENTOS DEL PERFIL
// ==========================================

const formPerfil = document.getElementById("formPerfil");
const camposPerfil = document.getElementById("camposPerfil");

const botonEditar = document.getElementById("botonEditar");
const botonCancelar = document.getElementById("botonCancelar");
const botonGuardar = document.getElementById("botonGuardar");

const mensajePerfil = document.getElementById("mensajePerfil");

const inputFoto = document.getElementById("inputFoto");
const perfilFoto = document.getElementById("perfilFoto");

const botonPerfil = document.getElementById("botonPerfil");


// ==========================================
// ALMACENAMIENTO
// ==========================================

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


// ==========================================
// MENSAJES
// ==========================================

function mostrarMensaje(texto, esError = false) {

    if (!mensajePerfil) return;

    mensajePerfil.textContent = texto;

    mensajePerfil.classList.toggle("error", esError);
}


// ==========================================
// CARGAR DATOS DEL PERFIL
// ==========================================

function cargarPerfil() {

    let datos = {};

    try {

        datos = JSON.parse(leerDato("perfil")) || {};

    } catch (error) {

        datos = {};
    }

    formPerfil.querySelectorAll("input[name]").forEach(input => {

        input.value = datos[input.name] || "";

    });

    document.getElementById("perfilNombre").textContent =
        datos.nombre || "Tu nombre";

    document.getElementById("perfilCorreo").textContent =
        datos.correo || "Agrega tu correo";
}


// ==========================================
// ESTADO DE EDICIÓN
// ==========================================

function cambiarEdicion(editando) {

    camposPerfil.disabled = !editando;

    botonEditar.hidden = editando;

    botonCancelar.hidden = !editando;

    botonGuardar.hidden = !editando;
}


// ==========================================
// EDITAR PERFIL
// ==========================================

botonEditar.addEventListener("click", () => {

    mostrarMensaje("");

    cambiarEdicion(true);

    formPerfil.elements.namedItem("nombre").focus();

});


// ==========================================
// CANCELAR EDICIÓN
// ==========================================

botonCancelar.addEventListener("click", () => {

    cargarPerfil();

    cambiarEdicion(false);

    ocultarPassword();

    mostrarMensaje("");

});


// ==========================================
// GUARDAR CAMBIOS
// ==========================================

formPerfil.addEventListener("submit", evento => {

    evento.preventDefault();

    // Quitar espacios sobrantes
    formPerfil.querySelectorAll("input[name]").forEach(input => {

        input.value = input.value.trim();

    });


    // Validar campos
    if (!formPerfil.reportValidity()) {

        mostrarMensaje("Revisa los campos obligatorios.", true);

        return;
    }


    // Obtener datos
    const datos = Object.fromEntries(

        Array.from(
            formPerfil.querySelectorAll("input[name]"),

            input => [input.name, input.value]
        )

    );


    // Guardar datos
    if (!guardarDato("perfil", JSON.stringify(datos))) {

        mostrarMensaje("No se pudieron guardar los cambios.", true);

        return;
    }


    // Actualizar información
    cargarPerfil();

    cambiarEdicion(false);

    ocultarPassword();

    mostrarMensaje("Perfil actualizado correctamente.");

});


// ==========================================
// FOTO DE PERFIL
// ==========================================

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

        // Crear lienzo
        const lienzo = document.createElement("canvas");

        lienzo.width = 256;
        lienzo.height = 256;

        const lado = Math.min(imagen.width, imagen.height);

        const contexto = lienzo.getContext("2d");


        // Fondo blanco
        contexto.fillStyle = "white";

        contexto.fillRect(0, 0, 256, 256);


        // Recortar imagen al centro
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


        // Convertir a JPEG
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


// ==========================================
// ACCESOS RÁPIDOS
// ==========================================

function irAVista(nombre) {

    const boton = document.querySelector(
        `.nav-btn[data-vista="${nombre}"]`
    );

    if (boton) {

        boton.click();
    }
}


// Abrir perfil desde la imagen superior
botonPerfil.addEventListener("click", () => {

    irAVista("perfil");

});


// Accesos del perfil
document.querySelectorAll("[data-ir]").forEach(boton => {

    boton.addEventListener("click", () => {

        irAVista(boton.dataset.ir);

    });

});


// ==========================================
// MOSTRAR Y OCULTAR CONTRASEÑA
// ==========================================

const botonVerPassword = document.getElementById("botonVerPassword");

const passwordPerfil = document.getElementById("passwordPerfil");

let passwordVisible = false;


function ocultarPassword() {

    passwordPerfil.type = "password";

    botonVerPassword.textContent = "👁";

    passwordVisible = false;
}


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


// ==========================================
// ESTADO INICIAL
// ==========================================

cargarPerfil();


// Recuperar foto guardada
const fotoGuardada = leerDato("fotoPerfil");

if (fotoGuardada) {

    ponerFoto(fotoGuardada);
}
