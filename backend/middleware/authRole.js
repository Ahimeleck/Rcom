// middleware/authRole.js

const ROLES = require('../config/roles');

// Middleware para verificar el rol del usuario
const verificarRol = (rolesPermitidos) => {
  return (req, res, next) => {
    const usuario = req.usuario; // Esto viene del middleware verificarToken

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Usuario no autenticado' });
    }

    if (!rolesPermitidos.includes(usuario.role)) {
      return res.status(403).json({ mensaje: 'Acceso prohibido: No tienes el rol necesario' });
    }

    next();
  };
};

module.exports = verificarRol;
