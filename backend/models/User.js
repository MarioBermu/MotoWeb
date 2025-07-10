const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: {
    type: String,
    default: '/assets/avatars/avatar1.png' // ✅ imagen por defecto
  },
  role: {
    type: String,
    enum: ['basic','admin'],
    default: 'basic'
  }
});

module.exports = mongoose.model('User', UserSchema);
