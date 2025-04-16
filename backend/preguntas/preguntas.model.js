const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const preguntaSchema = new Schema({
  name: String,
  message:String,
},
{timestamps: true}
);

module.exports = preguntaSchema;
