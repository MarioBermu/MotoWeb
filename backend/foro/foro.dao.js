const mongoose = require('mongoose');
const foroSchema = require('./foro.model');

foroSchema.statics = {
  create: function (data) {
    const mensaje = new this(data);
    return mensaje.save()
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

module.exports = mongoose.model('Mensaje', foroSchema);
