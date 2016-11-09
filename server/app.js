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
  category: String,
  eBook: Boolean,
  volume: String,
  author: String,
  genre: String,
  stars: Number,
  comments: String
});

var books = mongoose.model('books', bookSchema);


// app.get('/', function (req, res) {
//   res.sendFile(path.resolve('views/index.html'));
// });//end of base URL

app.post('/bookPost', function (req, res) {
  console.log('inside post', req.body);
  var bookToAdd={
    title: req.body.title,
    category: req.body.category,
    eBook: req.body.eBook,
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

app.get('/getBooks', function (req, res) {
  books.find()
  .then(function(data) {
    res.send(data);
  });//end of then function
});//end of get books function

app.delete('/deleteBook/:id', function (req, res) {
  console.log('before delete');
  var bookId = req.params.id;
  console.log('from app.js',bookId);

  books.findOne({_id: bookId}, function(err, book) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      books.remove({_id: bookId}, function(err) {});
      console.log('HAS BEEN DELETED SON!');
      res.sendStatus(200);
    } // end else
  }); // end books.findOne
  });

app.put('/bookUpdate/:id', function (req, res) {
  // var updateBookId = req.params.id;
  var book = req.body;
  console.log('book test' , book);
  console.log('test title', req.body.book.title);
  console.log('test category' ,  req.body.book.category);
  console.log('testing ID' , req.body.book._id);
  var _id = req.body.book._id;
  books.findOneAndUpdate(_id, {title: req.body.book.title, category: req.body.book.category, eBook: req.body.book.eBook,
    volume: req.body.book.volume, author: req.body.book.author, genre: req.body.book.genre, stars: req.body.book.stars,
    comments: req.body.book.comments}, function (err) {

    });
});//end of app.update function
//static folder
// app.use(express.static('public'));

app.get("/*", function(req,res){
  var file = req.params[0] || "/views/index.html";
  res.sendFile(path.join(__dirname, "/public/", file));
});
