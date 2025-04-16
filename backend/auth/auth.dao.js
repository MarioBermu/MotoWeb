const mongoose = require('mongoose');
const authSchema = require('./auth.model');

authSchema.statics = {
  create: function (data, cb) {
    const user = new this(data);
    if (!cb) {
      return user.save();
    }
  user.save()
    .then(result => {
    console.log('User created',result);
    cb(null, result);
  })
  .catch(err => {
    console.log('Error creating user', err);
    cb(err, null);
  });
  },
  login: function (query, cb) {
    this.find(query, cb);
  }
}

const authModel = mongoose.model('Users', authSchema);
module.exports = authModel;
