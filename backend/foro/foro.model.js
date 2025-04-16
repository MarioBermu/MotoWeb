const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const foroSchema = new Schema({
  name: String,
  message:String,
},
{timestamps: true}
);

module.exports = foroSchema;
