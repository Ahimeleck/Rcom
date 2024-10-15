const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verificarToken, verificarRol } = require('../middleware/authMiddleware');  // Importar ambos middlewares correctamente
const multer = require('multer');
const path = require('path');

// Configuración de multer para la subida de imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes (jpeg, jpg, png)'));
    }
  }
});

// Ruta para registrar usuarios (solo accesible por superadministradores)
router.post('/register', 
  verificarToken, 
  verificarRol('superadministrador'),  // Cambiar 'superadmin' por 'superadministrador' según lo que está en la base de datos
  upload.single('imagen'),  
  authController.registrarUsuario
);

// Ruta para login (accesible por todos los usuarios)
router.post('/login', authController.loginUsuario);

module.exports = router;
