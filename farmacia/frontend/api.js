
const API_URL = "http://localhost:8080/api";

// Obtener productos desde Spring Boot
async function cargarProductos() {
    const destacados = document.getElementById("productos-destacados");
    const catalogo = document.getElementById("contenedor-productos");

    try {
        const respuesta = await fetch(`${API_URL}/productos`);

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener los productos");
        }

        const productos = await respuesta.json();

        // Mostrar productos en ambas secciones
        mostrarProductos(productos, destacados);
        mostrarProductos(productos, catalogo);

    } catch (error) {
        console.error("Error al cargar productos:", error);

        if (destacados) {
            destacados.textContent = "No se pudieron cargar los productos.";
        }

        if (catalogo) {
            catalogo.textContent = "No se pudieron cargar los productos.";
        }
    }
}

// Crear las tarjetas de productos
function mostrarProductos(productos, contenedor) {
    if (!contenedor) return;

    contenedor.replaceChildren();

    if (productos.length === 0) {
        contenedor.textContent = "No hay productos disponibles.";
        return;
    }

    productos.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "producto";

        const imagen = document.createElement("img");
        imagen.src = `images/${producto.imagen || "placeholder.jpg"}`;
        imagen.alt = producto.nombre;

        imagen.onerror = () => {
            imagen.src = "images/placeholder.jpg";
        };

        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.textContent = `$${Number(producto.precio).toFixed(2)}`;

        const boton = document.createElement("button");
        boton.textContent = "Agregar al carrito";

        tarjeta.append(imagen, nombre, precio, boton);
        contenedor.appendChild(tarjeta);
    });
}

// Cargar productos al abrir la página
document.addEventListener("DOMContentLoaded", cargarProductos);
