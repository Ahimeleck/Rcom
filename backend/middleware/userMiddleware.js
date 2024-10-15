const ROLES = require('../config/roles');

const esSuperAdmin = (req, res, next) => {
  if (req.user.role === ROLES.SUPERADMIN) {
    next(); // Continuar si es SuperAdmin
  } else {
    res.status(403).json({ mensaje: 'No tienes los permisos necesarios para realizar esta acción' });
  }
};

module.exports = { esSuperAdmin };
