const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ Ruta: cambiar avatar predeterminado
router.post('/set-avatar', async (req, res) => {
  const { userId, avatar } = req.body;

  try {
    if (!userId || !avatar) {
      return res.status(400).json({ message: 'Faltan datos: userId o avatar' });
    }

    await User.findByIdAndUpdate(userId, { profileImage: avatar });
    res.status(200).json({ profileImage: avatar });
  } catch (error) {
    console.error('❌ Error en /set-avatar:', error);
    res.status(500).json({ message: 'Error al cambiar avatar' });
  }
});

module.exports = router;
