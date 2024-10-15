const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models');

// Cargar variables de entorno
dotenv.config();

// Inicializar la aplicación
const app = express();

// Habilitar CORS
app.use(cors());

// Middleware para procesar JSON de rutas que solo manejan datos JSON
app.use(express.json({ limit: '10mb' }));

// Middleware para manejar formularios y archivos
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rutas de autenticación
app.use('/api/auth', require('./routes/authRoutes'));

// Servir archivos estáticos desde la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Sincronizar la base de datos y levantar el servidor
sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos sincronizada');
}).catch((err) => {
  console.error('Error al sincronizar la base de datos:', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
