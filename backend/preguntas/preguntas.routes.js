const Pregunta = require('./preguntas.controller');
const routes = require('express').Router();

module.exports = (router) => {
router.post('/preguntas', Pregunta.createPregunta);
router.get('/preguntas', Pregunta.getPreguntas);
}
