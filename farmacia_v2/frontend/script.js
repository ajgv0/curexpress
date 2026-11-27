(() => {
    // MENÚ LATERAL
    const botonMenu = document.getElementById("botonMenu");
    const menuLateral = document.querySelector(".menu-lateral");

    if (botonMenu && menuLateral) {
        botonMenu.addEventListener("click", () => {
            menuLateral.classList.toggle("contraido");
        });
    }

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

    // MODO OSCURO
    const botonTema = document.getElementById("botonTema");
    const temaGuardado = leerDato("tema");

    if (temaGuardado === "oscuro") {
        document.body.classList.add("modo-oscuro");
        if (botonTema) {
            botonTema.textContent = "☀";
        }
    }

    if (botonTema) {
        botonTema.addEventListener("click", () => {
            document.body.classList.toggle("modo-oscuro");

            const modoOscuro = document.body.classList.contains("modo-oscuro");

            if (modoOscuro) {
                botonTema.textContent = "☀";
                guardarDato("tema", "oscuro");
            } else {
                botonTema.textContent = "☾";
                guardarDato("tema", "claro");
            }
        });
    }

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
            cambiarIdioma: "Cambiar idioma",
            cambiarTema: "Cambiar tema",
            perfilUsuario: "Perfil de usuario",
            crearCuenta: "Crear cuenta",
            verPassword: "Mostrar contraseña",
            ocultarPassword: "Ocultar contraseña",

            registroTitulo: "Crear cuenta",
            registroDesc: "Regístrate para comprar tus medicamentos y dar seguimiento a tus pedidos.",
            regNombre: "Nombre completo",
            regCorreo: "Correo electrónico",
            regTelefono: "Teléfono (10 dígitos)",
            regPassword: "Contraseña",
            regConfirmar: "Confirmar contraseña",
            regAyudaPassword: "Mínimo 8 caracteres.",
            regCrear: "Crear cuenta",
            regYaTengo: "¿Ya tienes cuenta?",
            regIrInicio: "Ir al inicio",
            errNombre: "Escribe tu nombre completo.",
            errCorreo: "Escribe un correo electrónico válido.",
            errTelefono: "El teléfono debe tener 10 dígitos.",
            errPassword: "La contraseña debe tener al menos 8 caracteres.",
            errConfirmar: "Las contraseñas no coinciden.",
            errCorreoExiste: "Ya existe una cuenta con ese correo.",
            errGuardar: "No se pudo guardar la cuenta en este navegador.",
            regExito: "Cuenta creada. Redirigiendo a tu perfil...",

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
            cambiarIdioma: "Change language",
            cambiarTema: "Change theme",
            perfilUsuario: "User profile",
            crearCuenta: "Create account",
            verPassword: "Show password",
            ocultarPassword: "Hide password",

            registroTitulo: "Create account",
            registroDesc: "Sign up to buy your medicines and track your orders.",
            regNombre: "Full name",
            regCorreo: "Email",
            regTelefono: "Phone (10 digits)",
            regPassword: "Password",
            regConfirmar: "Confirm password",
            regAyudaPassword: "At least 8 characters.",
            regCrear: "Create account",
            regYaTengo: "Already have an account?",
            regIrInicio: "Go to home",
            errNombre: "Enter your full name.",
            errCorreo: "Enter a valid email address.",
            errTelefono: "Phone must have 10 digits.",
            errPassword: "Password must be at least 8 characters.",
            errConfirmar: "Passwords do not match.",
            errCorreoExiste: "An account with that email already exists.",
            errGuardar: "The account could not be saved in this browser.",
            regExito: "Account created. Redirecting to your profile...",

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

    let idiomaActual = leerDato("idioma") || "es";

    function t(clave) {
        return traducciones[idiomaActual][clave] || clave;
    }
    const botonIdioma = document.getElementById("botonIdioma");

    function cambiarIdioma(idioma) {
        idiomaActual = traducciones[idioma] ? idioma : "es";
        const diccionario = traducciones[idiomaActual];

        document.querySelectorAll("[data-i18n]").forEach((elemento) => {
            const clave = elemento.dataset.i18n;
            if (diccionario[clave] !== undefined) {
                elemento.textContent = diccionario[clave];
            }
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach((elemento) => {
            const clave = elemento.dataset.i18nPlaceholder;
            if (diccionario[clave] !== undefined) {
                elemento.placeholder = diccionario[clave];
            }
        });

        if (botonIdioma) {
            botonIdioma.textContent = idiomaActual.toUpperCase();
        }

        document.querySelectorAll("[data-i18n-aria]").forEach((elemento) => {
            const clave = elemento.dataset.i18nAria;
            if (diccionario[clave] !== undefined) {
                elemento.setAttribute("aria-label", diccionario[clave]);
            }
        });

        document.documentElement.lang = idiomaActual;

        if (typeof actualizarBotonesPassword === "function") {
            actualizarBotonesPassword();
        }
        guardarDato("idioma", idiomaActual);
    }

    if (botonIdioma) {
        botonIdioma.addEventListener("click", () => {
            const nuevoIdioma = idiomaActual === "es" ? "en" : "es";
            cambiarIdioma(nuevoIdioma);
        });
    }

    cambiarIdioma(idiomaActual);

    // PERFIL
    const formPerfil = document.getElementById("formPerfil");
    const camposPerfil = document.getElementById("camposPerfil");
    const botonEditar = document.getElementById("botonEditar");
    const botonCancelar = document.getElementById("botonCancelar");
    const botonGuardar = document.getElementById("botonGuardar");
    const mensajePerfil = document.getElementById("mensajePerfil");
    const inputFoto = document.getElementById("inputFoto");
    const perfilFoto = document.getElementById("perfilFoto");
    const botonPerfil = document.getElementById("botonPerfil");

    if (botonPerfil) {
        botonPerfil.addEventListener("click", () => {
            window.location.href = "perfil.html";
        });
    }

    // Botones de acceso rápido del perfil (data-ir="historial", etc.)
    document.querySelectorAll("[data-ir]").forEach((boton) => {
        boton.addEventListener("click", () => {
            window.location.href = boton.dataset.ir + ".html";
        });
    });

    function mostrarMensaje(texto, esError = false) {
        if (!mensajePerfil) return;

        mensajePerfil.textContent = texto;
        mensajePerfil.classList.toggle("error", esError);
    }

    function cargarPerfil() {
        if (!formPerfil) return;

        let datos = {};

        try {
            datos = JSON.parse(leerDato("perfil")) || {};
        } catch (error) {
            datos = {};
        }

        formPerfil.querySelectorAll("input[name]").forEach((input) => {
            input.value = datos[input.name] || "";
        });

        const perfilNombre = document.getElementById("perfilNombre");
        const perfilCorreo = document.getElementById("perfilCorreo");

        if (perfilNombre) {
            perfilNombre.textContent = datos.nombre || "Tu nombre";
        }

        if (perfilCorreo) {
            perfilCorreo.textContent = datos.correo || "Agrega tu correo";
        }
    }

    function cambiarEdicion(editando) {
        if (!formPerfil || !botonEditar || !botonCancelar || !botonGuardar) return;

        // Solo se bloquean los campos de datos; el botón de mostrar/ocultar
        // contraseña queda siempre disponible, independiente del modo de edición.
        formPerfil.querySelectorAll("input[name]").forEach((input) => {
            input.disabled = !editando;
        });

        botonEditar.hidden = editando;
        botonCancelar.hidden = !editando;
        botonGuardar.hidden = !editando;
    }

    if (botonEditar && formPerfil) {
        botonEditar.addEventListener("click", () => {
            mostrarMensaje("");
            cambiarEdicion(true);

            const campoNombre = formPerfil.elements.namedItem("nombre");
            if (campoNombre) {
                campoNombre.focus();
            }
        });
    }

    if (botonCancelar) {
        botonCancelar.addEventListener("click", () => {
            cargarPerfil();
            cambiarEdicion(false);
            ocultarPassword();
            mostrarMensaje("");
        });
    }

    if (formPerfil) {
        formPerfil.addEventListener("submit", (evento) => {
            evento.preventDefault();

            formPerfil.querySelectorAll("input[name]").forEach((input) => {
                input.value = input.value.trim();
            });

            if (!formPerfil.reportValidity()) {
                mostrarMensaje("Revisa los campos obligatorios.", true);
                return;
            }

            const datos = Object.fromEntries(
                Array.from(
                    formPerfil.querySelectorAll("input[name]"),
                    (input) => [input.name, input.value]
                )
            );

            if (!guardarDato("perfil", JSON.stringify(datos))) {
                mostrarMensaje("No se pudieron guardar los cambios.", true);
                return;
            }

            cargarPerfil();
            cambiarEdicion(false);
            ocultarPassword();

            mostrarMensaje("Perfil actualizado correctamente.");
        });
    }

    // FOTO DE PERFIL
    function ponerFoto(origen) {
        if (!origen) return;

        if (perfilFoto) {
            perfilFoto.src = origen;
        }

        if (botonPerfil) {
            const imagenBoton = botonPerfil.querySelector("img");
            if (imagenBoton) {
                imagenBoton.src = origen;
            }
        }
    }

    if (inputFoto) {
        inputFoto.addEventListener("change", () => {
            const archivo = inputFoto.files[0];

            if (!archivo) return;

            const url = URL.createObjectURL(archivo);
            const imagen = new Image();

            imagen.onload = () => {
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
    }

    // CONTRASEÑA (mostrar/ocultar): un clic, sin confirmación, siempre inicia oculta
    const botonesPassword = document.querySelectorAll(".toggle-password");
    function actualizarBotonPassword(boton) {
        const campo = document.getElementById(boton.dataset.target);
        if (!campo) return;

        const visible = campo.type === "text";
        boton.textContent = visible ? "✕" : "👁";
        boton.setAttribute("aria-label", t(visible ? "ocultarPassword" : "verPassword"));
    }

    function actualizarBotonesPassword() {
        document.querySelectorAll(".toggle-password").forEach(actualizarBotonPassword);
    }

    function ocultarPassword() {
        botonesPassword.forEach((boton) => {
            const campo = document.getElementById(boton.dataset.target);
            if (campo) campo.type = "password";
            actualizarBotonPassword(boton);
        });
    }

    botonesPassword.forEach((boton) => {
        boton.addEventListener("click", () => {
            const campo = document.getElementById(boton.dataset.target);
            if (!campo) return;

            campo.type = campo.type === "password" ? "text" : "password";
            actualizarBotonPassword(boton);
        });
    });

    ocultarPassword();

    // REGISTRO DE USUARIO
    const formRegistro = document.getElementById("formRegistro");
    const mensajeRegistro = document.getElementById("mensajeRegistro");

    function mostrarMensajeRegistro(clave, esError = true) {
        if (!mensajeRegistro) return;

        mensajeRegistro.textContent = clave ? t(clave) : "";
        mensajeRegistro.classList.toggle("error", esError);
    }

    function leerUsuarios() {
        try {
            const lista = JSON.parse(leerDato("usuarios"));
            return Array.isArray(lista) ? lista : [];
        } catch (error) {
            return [];
        }
    }

    if (formRegistro) {
        formRegistro.addEventListener("submit", (evento) => {
            evento.preventDefault();

            const campos = formRegistro.elements;
            const nombre = campos.nombre.value.trim();
            const correo = campos.correo.value.trim().toLowerCase();
            const telefono = campos.telefono.value.trim();
            const password = campos.password.value;
            const confirmar = campos.confirmar.value;

            let error = "";

            if (!nombre) {
                error = "errNombre";
            } else if (!campos.correo.checkValidity() || !correo) {
                error = "errCorreo";
            } else if (telefono && !/^[0-9]{10}$/.test(telefono)) {
                error = "errTelefono";
            } else if (password.length < 8) {
                error = "errPassword";
            } else if (password !== confirmar) {
                error = "errConfirmar";
            }

            const usuarios = leerUsuarios();

            if (!error && usuarios.some((u) => u.correo === correo)) {
                error = "errCorreoExiste";
            }

            if (error) {
                mostrarMensajeRegistro(error);
                return;
            }

            // Rol por defecto: CLIENTE (igual que el enum Rol del backend)
            usuarios.push({ nombre, correo, telefono, password, rol: "CLIENTE" });

            const perfil = { nombre, correo, telefono, password };

            if (!guardarDato("usuarios", JSON.stringify(usuarios)) ||
                !guardarDato("perfil", JSON.stringify(perfil))) {
                mostrarMensajeRegistro("errGuardar");
                return;
            }

            formRegistro.reset();
            ocultarPassword();
            mostrarMensajeRegistro("regExito", false);

            setTimeout(() => {
                window.location.href = "perfil.html";
            }, 1200);
        });
    }

    // ESTADO INICIAL
    cargarPerfil();
    cambiarEdicion(false);

    const fotoGuardada = leerDato("fotoPerfil");
    if (fotoGuardada) {
        ponerFoto(fotoGuardada);
    }
})();