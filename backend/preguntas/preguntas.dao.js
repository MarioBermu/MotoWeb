const mongoose = require('mongoose');
const preguntaSchema = require('./preguntas.model');

preguntaSchema.statics = {
  create: function (data) {
    const pregunta = new this(data);
    return pregunta.save()
      .then(result => {
        console.log('mensaje creado', result);
        return result;
      })
      .catch(err => {
        console.log('Error', err);
        throw err; // Propaga el error para manejarlo más arriba si es necesario
      });
  },

  get: function (query) {
    return this.find(query);
  },
}

module.exports = mongoose.model('Pregunta', preguntaSchema);
