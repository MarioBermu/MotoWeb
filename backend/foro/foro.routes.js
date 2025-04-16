const Mensaje = require('./foro.controller');
const routes = require('express').Router();

module.exports = (router) => {
router.post('/foro', Mensaje.createMensaje);
router.get('/foro', Mensaje.getMensajes);
}
