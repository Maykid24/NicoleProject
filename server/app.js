var express = require('express');
var app=express();
var path = require('path');
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
var mongoose = require('mongoose');
// 27017 is default mongo port
mongoose.connect(process.env.PORT || 'localhost:27017/bookworms');

// spin up server
app.listen( process.env.PORT || 8080, function( req, res ){
  console.log( 'listening on 8080' );
});//end of spinning up server

var bookSchema = mongoose.Schema({
  title: {type: String, required: true},
  volume: String,
  author: String,
  genre: String,
  stars: Number,
  comments: String
});

var books = mongoose.model('books', bookSchema);


app.get('/', function (req, res) {
  res.sendFile(path.resolve('views/index.html'));
});//end of base URL

app.post('/bookPost', function (req, res) {
  console.log('inside post', req.body);
  var bookToAdd={
    title: req.body.title,
    volume: req.body.volume,
    author: req.body.author,
    genre: req.body.genre,
    stars: req.body.stars,
    comments: req.body.comments
  };//end of array
  var newBook = books(bookToAdd);
  newBook.save(function(err) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(newBook);
    }
  });
});//End of book post function

//static folder
app.use(express.static('public'));
