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