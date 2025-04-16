// backend/routes/route.js
const express = require('express');
const router = express.Router();
const Route = require('../models/Route');

// GET: Obtener todas las rutas
router.get('/', async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (err) {
    console.error('Error al obtener rutas:', err);
    res.status(500).json({ msg: 'Error al obtener rutas' });
  }
});

// POST: Crear una nueva ruta
router.post('/', async (req, res) => {
  const { name, coordinates } = req.body;
  try {
    const newRoute = new Route({ name, coordinates });
    await newRoute.save();
    res.status(201).json({ msg: 'Ruta creada correctamente', route: newRoute });
  } catch (err) {
    console.error('Error al crear ruta:', err);
    res.status(500).json({ msg: 'Error al crear ruta' });
  }
});

module.exports = router;
