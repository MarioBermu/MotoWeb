// backend/foro/foro.controller.js
const Mensaje = require('./foro.dao');

exports.createMensaje = async (req, res) => {
  console.log('Cuerpo de la solicitud:', req.body);

  const { name = 'Anónimo', message } = req.body;
  if (!message || !message.trim()) {
    return res.status(400).json({ message: 'El mensaje no puede estar vacío' });
  }

  try {
    // Usamos la promesa que devuelve tu DAO
    const nuevo = await Mensaje.create({ name, message: message.trim() });
    // Respondemos inmediatamente con el objeto creado
    return res.status(201).json(nuevo);
  } catch (err) {
    console.error('Error al guardar mensaje:', err);
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Mensaje duplicado' });
    }
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.getMensajes = async (_req, res) => {
  try {
    // Aquí podrías usar Mensaje.get({}) si tu DAO lo expone
    const mensajes = await Mensaje.find().sort({ createdAt: -1 });
    return res.status(200).json(mensajes);
  } catch (err) {
    console.error('Error al leer mensajes:', err);
    return res.status(500).json({ message: 'Error interno al leer mensajes' });
  }
};
