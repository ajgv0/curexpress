
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
