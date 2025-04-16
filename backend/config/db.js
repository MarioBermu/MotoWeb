//fichero de configuracion de la base de datos, donde hacemos la conexion a mongo
const mongoose = require('mongoose');
const dbURL = require('./properties').DB;

module.exports = () => {
  mongoose.connect(dbURL)
    .then(() => console.log(`Mongo connected on ${dbURL}`))
    .catch(err => console.log(`Connection has error ${err}`))

    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log(`Mongo is disconnected`);
        process.exit(0);
      } catch (err) {
        console.error('Error closing Mongoose connection:', err);
        process.exit(1);
      }
    });
  }
