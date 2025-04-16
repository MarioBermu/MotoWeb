const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.createUser = (req, res, next) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password)
  }

  User.create(newUser, (err, user) => {
    if (err) {
      if (err.code === 11000) {
        return res.status(409).send('Email already exists');
      } else {
        return res.status(500).send('Server error');
      }
    }

    // if (err && err.code === 11000) return res.status(409).send('Email already exists');
    // if (err) return res.status(500).send('Server error');

    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({ id: user.id },
      SECRET_KEY, {
        expiresIn: expiresIn
      });
    const dataUser = {
      name: user.name,
      email: user.email,
      accessToken: accessToken,
      expiresIn: expiresIn
    }
    // response
    res.send({ dataUser });
  });
}

exports.loginUser = (req, res, next) => {
  const userData = {
    email: req.body.email,
    password: req.body.password
  };

  User.findOne({ email: userData.email })
    .then(user => {
      if (!user) {
        // email does not exist
        return res.status(409).send({ message: 'Something is wrong' });
      }

      const resultPassword = bcrypt.compareSync(userData.password, user.password);
      if (resultPassword) {
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
        const dataUser = {
          name: user.name,
          email: user.email,
          accessToken: accessToken,
          expiresIn: expiresIn
        };
        // Solo enviar una respuesta en caso de éxito
        return res.send({ dataUser });
      } else {
        // password wrong
        return res.status(409).send({ message: 'Something is wrong' });
      }
    })
    .catch(err => {
      // Solo enviar una respuesta en caso de error
      return res.status(500).send({ message: 'Server error' });
    });
};
