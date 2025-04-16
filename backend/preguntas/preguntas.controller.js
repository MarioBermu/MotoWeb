const Pregunta = require('./preguntas.dao');

exports.createPregunta = (req, res) => {
  console.log('Cuerpo de la solicitud:', req.body);
  const newPregunta = {
    name: req.body.name,
    pregunta: req.body.message,
  }

  Pregunta.create(newPregunta, (err, pregunta) => {

    if (err && err.code === 11000)
     return res.status(409).send('name already exists');
    if (err)
    return res.status(500).send('Server error');

    res.send({ newPregunta });
  });
}

exports.getPreguntas = async (req, res) => {
  try {
    const preguntas = await Pregunta.find();
    res.json(preguntas);
  } catch (err) {
    res.json({ message: 'estoy triste' });
  }
}
