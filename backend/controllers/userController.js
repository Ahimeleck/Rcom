// controllers/userController.js
const { User } = require('../models');
const fs = require('fs');
const path = require('path');

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los usuarios' });
  }
};

// Buscar usuarios por nombre o correo electrónico
exports.buscarUsuarios = async (req, res) => {
  const { query } = req.query;
  try {
    const usuarios = await User.findAll({
      where: {
        [Op.or]: [
          { nombre: { [Op.like]: `%${query}%` } },
          { email: { [Op.like]: `%${query}%` } }
        ]
      }
    });
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al buscar los usuarios' });
  }
};

// Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, role } = req.body;

  try {
    let usuario = await User.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Actualizar datos del usuario
    usuario.nombre = nombre || usuario.nombre;
    usuario.email = email || usuario.email;
    usuario.role = role || usuario.role;

    if (req.file) {
      const avatarPath = path.join(__dirname, '../uploads/', usuario.avatar);
      if (fs.existsSync(avatarPath)) {
        fs.unlinkSync(avatarPath);
      }
      usuario.avatar = req.file.filename;
    }

    await usuario.save();
    res.status(200).json({ mensaje: 'Usuario actualizado exitosamente', usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el usuario' });
  }
};
