const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  name: String,
  year: String,
  autor: String,
  price: Number,
});

const model = mongoose.model('Book', bookSchema);

module.exports = model