const Mensaje = require('./foro.dao');

exports.createMensaje = (req, res) => {
  console.log('Cuerpo de la solicitud:', req.body);
  const newMensaje = {
    name: req.body.name,
    message: req.body.message,
  }

  Mensaje.create(newMensaje, (err, mensaje) => {

    if (err && err.code === 11000)
     return res.status(409).send('name already exists');
    if (err)
    return res.status(500).send('Server error');

    res.send({ newMensaje });
  });
}

exports.getMensajes = async (req, res) => {
  try {
    const mensajes = await Mensaje.find();
    res.json(mensajes);
  } catch (err) {
    res.json({ message: 'estoy triste' });
  }
}
