const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Función para generar JWT
const generarToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
  const { nombre, email, password, role } = req.body;
  const avatar = req.file ? `/uploads/${req.file.filename}` : null;  // Ruta de la imagen

  // Depuración: Muestra los datos que llegan al servidor
  console.log("Datos recibidos:", { nombre, email, password, role, avatar });

  try {
    // Verificar si el usuario ya existe
    let usuario = await User.findOne({ where: { email } });
    if (usuario) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el usuario
    usuario = await User.create({
      nombre,
      email,
      password: hashedPassword,
      role,
      avatar,  // Guardar la ruta de la imagen
    });

    // Generar token
    const token = generarToken(usuario.id, usuario.role);

    res.status(201).json({
      mensaje: 'Usuario creado exitosamente',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        role: usuario.role,
        avatar: usuario.avatar,
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Login de usuario
exports.loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const usuario = await User.findOne({ where: { email } });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const esMatch = await bcrypt.compare(password, usuario.password);
    if (!esMatch) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    // Generar token
    const token = generarToken(usuario.id, usuario.role);

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        role: usuario.role,
        avatar: usuario.avatar,
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};
