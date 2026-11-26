
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
