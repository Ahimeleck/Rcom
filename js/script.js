document.addEventListener("DOMContentLoaded", function() {
    // Manejar el menú retráctil
    const cerrarMenuBtn = document.getElementById("cerrarMenu");
    const menu = document.getElementById("cuerpo");

    if (cerrarMenuBtn && menu) {
        cerrarMenuBtn.addEventListener("click", function() {
            menu.classList.toggle("expandido");
        });
    }

    // Cargar usuarios al cargar la página
    cargarUsuarios();

    // Manejar la búsqueda de usuarios
    const inputBuscar = document.getElementById("buscarUsuario");
    inputBuscar.addEventListener("input", function() {
        buscarUsuarios(inputBuscar.value);
    });

    // Función para cargar usuarios de la base de datos
    async function cargarUsuarios() {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('No estás autenticado. Por favor, inicia sesión.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/usuarios', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const usuarios = await response.json();

            if (response.ok) {
                mostrarUsuarios(usuarios);
            } else {
                console.error('Error al cargar los usuarios:', usuarios.mensaje);
            }
        } catch (error) {
            console.error('Error del servidor:', error);
        }
    }

    // Función para buscar usuarios
    async function buscarUsuarios(query) {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('No estás autenticado. Por favor, inicia sesión.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/usuarios/buscar?q=${query}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const usuarios = await response.json();

            if (response.ok) {
                mostrarUsuarios(usuarios);
            } else {
                console.error('Error al buscar usuarios:', usuarios.mensaje);
            }
        } catch (error) {
            console.error('Error del servidor:', error);
        }
    }

    // Función para mostrar la lista de usuarios
    function mostrarUsuarios(usuarios) {
        const listaUsuarios = document.getElementById("listaUsuarios");
        listaUsuarios.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos

        usuarios.forEach(usuario => {
            const divUsuario = document.createElement('div');
            divUsuario.classList.add('usuario');

            const avatar = document.createElement('img');
            avatar.src = usuario.avatar || 'images/Avatar.svg'; // Si no hay imagen, usar un avatar predeterminado
            avatar.alt = 'Usuario';

            const nombreCorreoDiv = document.createElement('div');
            nombreCorreoDiv.classList.add('nombreCorreo');

            const nombreUsuario = document.createElement('strong');
            nombreUsuario.classList.add('nombreUsuario');
            nombreUsuario.textContent = usuario.nombre;

            const correoUsuario = document.createElement('span');
            correoUsuario.textContent = usuario.email;

            const rolDiv = document.createElement('div');
            rolDiv.classList.add('rol');
            rolDiv.textContent = usuario.role === 'administrador' ? 'Administrador' : 'Usuario';

            const editarBtn = document.createElement('a');
            editarBtn.href = '#';
            editarBtn.classList.add('editar');
            editarBtn.innerHTML = '<span class="material-symbols-outlined">edit</span>';
            editarBtn.addEventListener('click', () => editarUsuario(usuario));

            const borrarBtn = document.createElement('a');
            borrarBtn.href = '#';
            borrarBtn.classList.add('borrar');
            borrarBtn.innerHTML = '<span class="material-symbols-outlined">delete</span>';
            borrarBtn.addEventListener('click', () => abrirModalConfirmarBorrado(usuario.id));

            nombreCorreoDiv.appendChild(nombreUsuario);
            nombreCorreoDiv.appendChild(correoUsuario);

            divUsuario.appendChild(avatar);
            divUsuario.appendChild(nombreCorreoDiv);
            divUsuario.appendChild(rolDiv);
            divUsuario.appendChild(editarBtn);
            divUsuario.appendChild(borrarBtn);

            listaUsuarios.appendChild(divUsuario);
        });
    }

    // Función para manejar la edición de un usuario (solo para superadministrador)
    async function editarUsuario(usuario) {
        abrirModal('modalCrearUsuario');
        document.getElementById('nombre').value = usuario.nombre;
        document.getElementById('email').value = usuario.email;
        document.getElementById('esAdmin').checked = usuario.role === 'administrador';

        // Si necesitas hacer alguna acción específica para actualizar el usuario, puedes hacerla aquí.
    }

    // Función para confirmar el borrado de un usuario
    async function abrirModalConfirmarBorrado(idUsuario) {
        abrirModal('modalConfirmarBorrado');
        document.getElementById('confirmarBorrado').onclick = async function() {
            await borrarUsuario(idUsuario);
        };
    }

    // Función para borrar un usuario
    async function borrarUsuario(idUsuario) {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('No estás autenticado. Por favor, inicia sesión.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/usuarios/${idUsuario}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                cerrarModal('modalConfirmarBorrado');
                cargarUsuarios(); // Volver a cargar la lista de usuarios después de la eliminación
            } else {
                console.error('Error al eliminar el usuario:', await response.json());
            }
        } catch (error) {
            console.error('Error del servidor:', error);
        }
    }

    // Función para abrir el modal
    function abrirModal(idModal) {
        const modal = document.getElementById(idModal);
        if (modal) {
            modal.style.display = "block"; // Muestra el modal
        }
    }

    // Función para cerrar el modal
    function cerrarModal(idModal) {
        const modal = document.getElementById(idModal);
        if (modal) {
            modal.style.display = "none"; // Oculta el modal
        }
    }
});
