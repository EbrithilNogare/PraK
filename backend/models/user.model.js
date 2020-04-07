const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  "_id": String,
  "username": String,
  "password": String,
  "role": String,
  "session": {
    "_id": String,
    "expiration": Date,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
