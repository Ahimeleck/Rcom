const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Middleware para verificar el token JWT
const verificarToken = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ mensaje: 'No hay token, permiso denegado' });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

    // Buscamos al usuario en la base de datos y lo agregamos al req
    const usuario = await User.findByPk(decoded.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    req.usuario = usuario;
    next();
  } catch (err) {
    res.status(401).json({ mensaje: 'Token no es válido' });
  }
};

// Middleware para verificar roles
const verificarRol = (role) => {
  return (req, res, next) => {
    if (req.usuario.role === role) {  // Aquí se compara con el rol de la base de datos
      next();
    } else {
      return res.status(403).json({ mensaje: 'No tienes permiso para realizar esta acción' });
    }
  };
};

module.exports = { verificarToken, verificarRol };
