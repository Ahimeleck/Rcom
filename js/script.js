document.addEventListener("DOMContentLoaded", function menuRetractil() {
    const cerrarMenuBtn = document.getElementById("cerrarMenu");
    const menu = document.getElementById("cuerpo");

    cerrarMenuBtn.addEventListener("click", function colapsarExpandir() {
        // Alternar entre las clases expandido y colapsado
        menu.classList.toggle("expandido");
        menu.classList.toggle("colapsado");
    });
});

document.addEventListener("DOMContentLoaded", function inicializarBarraDeProgreso() {
    const btnSincronizar = document.getElementById("btnSincronizar");
    const barraProgreso = document.getElementById("barraProgreso");
    const mensaje = document.getElementById("completado");
    const ultimaSincronizacion = document.getElementById("ultimaSincronizacion");
  
    btnSincronizar.addEventListener("click", function iniciarAnimacionDeBarra() {
        // Restablecer la barra de progreso a 0%
        barraProgreso.style.width = "0%";
        barraProgreso.style.padding = "10px";
        barraProgreso.textContent = "0%";
        mensaje.textContent = ""; // Limpiar el mensaje de sincronización completada
  
        // Iniciar la animación de la barra de progreso
        let porcentaje = 0;
        const intervalo = setInterval(function actualizarProgresoDeLaBarra() {
            porcentaje += 10; // Aumentar el porcentaje en cada iteración
            if (porcentaje > 100) {
                clearInterval(intervalo); // Detener la animación cuando se alcanza el 100%
                mensaje.textContent = "Sincronización completada"; // Mostrar el mensaje de sincronización completada
                actualizarUltimaSincronizacion(); // Actualizar la fecha de última sincronización
            } else {
                barraProgreso.style.width = porcentaje + "%"; // Actualizar el ancho de la barra de progreso
                barraProgreso.textContent = porcentaje + "%"; // Actualizar el texto de la barra de progreso
            }
        }, 500); // Intervalo de tiempo para cada iteración (en milisegundos)
    });

    function actualizarUltimaSincronizacion() {
        // Obtener la fecha y hora actual
        const fechaHoraActual = new Date();
        // Formatear la fecha y hora actual como dd/mm/aaaa - hh:mm:ss
        const fechaFormateada = `${fechaHoraActual.getDate()}/${fechaHoraActual.getMonth() + 1}/${fechaHoraActual.getFullYear()} - ${fechaHoraActual.getHours()}:${fechaHoraActual.getMinutes()}:${fechaHoraActual.getSeconds()}`;
        // Actualizar el contenido del elemento "ultimaSincronizacion" con la fecha y hora actual
        ultimaSincronizacion.textContent = fechaFormateada;
    }
});

function abrirModal(idModal) {
    document.getElementById(idModal).style.display = "block";
}

function cerrarModal(idModal) {
    document.getElementById(idModal).style.display = "none";
}

function guardarUsuario() {
    // Aquí puedes agregar la lógica para guardar el usuario
    cerrarModal('modalCrearUsuario');
}

function confirmarBorrado() {
    // Aquí puedes agregar la lógica para borrar el usuario
    cerrarModal('modalConfirmarBorrado');
    // Ocultar el usuario correspondiente
    let usuarioAEliminar = document.querySelector('.usuario.visible');
    if (usuarioAEliminar) {
        usuarioAEliminar.style.display = 'none';
    }
}

function cancelarBorrado() {
    cerrarModal('modalConfirmarBorrado');
}

// Función para manejar el click en la opción predeterminada
function toggleActive() {
    var parent = this.parentNode;
    parent.classList.toggle("active");
}

// Función para manejar el click en las opciones de la lista
function selectOption() {
    var currentEle = this.innerHTML;
    var defaultOption = document.querySelector(".default_option");
    defaultOption.innerHTML = currentEle;
    var selectWrap = this.closest(".select_wrap");
    selectWrap.classList.remove("active");
}

// Seleccionar elementos con la clase "default_option" y agregar evento click
var defaultOption = document.querySelector(".default_option");
defaultOption.addEventListener("click", toggleActive);

// Seleccionar elementos con la clase "select_ul li" y agregar evento click
var selectListItems = document.querySelectorAll(".select_ul li");
selectListItems.forEach(function(item) {
    item.addEventListener("click", selectOption);
});