require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const routeRoutes = require('./routes/route');  // Asegúrate de que la ruta es correcta
const userRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo conectado'))
  .catch(err => console.error(err));

// Rutas de autenticación
app.use('/api/auth', authRoutes);
// Rutas para "routes"
app.use('/api/routes', routeRoutes);

// Servir carpeta de imágenes
app.use('/uploads', express.static('uploads'));

// Usar las rutas
app.use('/api/users', userRoutes);
app.use('/api/users', require('./routes/user'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
