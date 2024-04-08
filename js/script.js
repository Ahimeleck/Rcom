document.addEventListener("DOMContentLoaded", function menuRetractil() {
    const cerrarMenuBtn = document.getElementById("cerrarMenu");
    const menu = document.getElementById("cuerpo");

    cerrarMenuBtn.addEventListener("click", function colapsarExpandir() {
        // Alternar entre las clases expandido y colapsado
        menu.classList.toggle("expandido");
        menu.classList.toggle("colapsado");
    });
});