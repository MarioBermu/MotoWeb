const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coordinates: { type: [[Number]], required: true } // Cada elemento será [lat, lng]
});

module.exports = mongoose.model('Route', RouteSchema);
