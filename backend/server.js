require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importar routers
const authRoutes  = require('./routes/auth');
const routeRoutes = require('./routes/route');
const userRoutes  = require('./routes/user');
const foroRoutes  = require('./foro/foro.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo conectado'))
  .catch(err => console.error('Error conectando a Mongo:', err));

// Servir estáticos (por ejemplo tus uploads de imágenes)
app.use('/uploads', express.static('uploads'));

// Montar rutas
app.use('/api/auth',  authRoutes);   // login / register
app.use('/api/routes', routeRoutes);  // tus rutas de "route"
app.use('/api/users',  userRoutes);   // perfil, subida de avatar, etc.
app.use('/api/foro',   foroRoutes);   // tu foro de comentarios


app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada: ' + req.originalUrl });
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error('Error atrapado por el handler:', err);
  res.status(500).json({ message: 'Error interno del servidor', error: err.message });
});

// Levantar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
