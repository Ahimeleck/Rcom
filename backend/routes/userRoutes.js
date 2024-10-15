// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verificarToken, verificarRol } = require('../middleware/authMiddleware');  // Cambiamos "middlewares" a "middleware"
const upload = require('../middleware/uploadMiddleware');  // Cambiamos "middlewares" a "middleware"

// Obtener lista de usuarios
router.get('/usuarios', verificarToken, userController.obtenerUsuarios);

// Buscar usuarios
router.get('/usuarios/buscar', verificarToken, userController.buscarUsuarios);

// Actualizar usuario (solo superadministrador)
router.put('/usuarios/:id', verificarToken, verificarRol('superadmin'), upload.single('avatar'), userController.actualizarUsuario);

module.exports = router;
