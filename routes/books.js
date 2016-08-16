var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('../models/Books');

var router = express.Router();
// router middleware
router.use(bodyParser.json());

router.post('/createBook', function (req, res) {
  var newBook = new Book ({
    title: req.body.title,
    volume: req.body.volume,
    author: req.body.author,
    genre: req.body.genre,
    stars: req.body.stars,
    comments: req.body.comments
  });//end of newBook array
  newBook.save(function(err) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json(newBook);
    }
  });
});//end of post create book
