var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = mongoose.Schema({
  title: {type: String, required: true},
  volume: String,
  author: String,
  genre: String,
  stars: Number,
  comments: String
});

var books = mongoose.model('books', bookSchema);

module.exports = books;
