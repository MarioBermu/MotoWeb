// backend/foro/foro.routes.js
const express = require('express');
const MensajeController = require('./foro.controller');
const router = express.Router();

// GET  /api/foro       → devolver todos los mensajes
router.get('/', MensajeController.getMensajes);

// POST /api/foro       → crear un nuevo mensaje
router.post('/', MensajeController.createMensaje);

module.exports = router;
