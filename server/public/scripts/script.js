myApp = angular.module('myApp', ['ngRoute', 'xeditable']);

myApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.
      when('/addBook', {
        templateUrl: "/views/routes/addBook.html",
        controller: "addingBook"
      }).
      when('/about',{
        templateUrl: "/views/routes/about.html",
        controller: "aboutController"
      }).
      when('/sortBook', {
        templateUrl: "/views/routes/sortBook.html",
        controller: "sortBookController"
      }).
      otherwise({
        redirectTo: "addBook"
      });
}]);//end of myApp config function


myApp.controller('addingBook', ['$scope', '$http', function ($scope, $http) {
  console.log("Making it to controller");
  $scope.book = {};
  $scope.addBook = function () {
    var newBook = {
      title: $scope.book.title,
      category: $scope.book.category,
      eBook: $scope.book.eBook,
      volume: $scope.book.volume,
      author: $scope.book.author,
      genre: $scope.book.genre,
      stars: $scope.book.stars,
      comments: $scope.book.comments
    };//end of array
    console.log('new book goes here please and thank you....', newBook);
    $http({
      method: 'POST',
      url: '/bookPost',
      data: newBook
    });//end of http call
    $scope.book.title = '';
    $scope.book.category = '';
    $scope.book.volume = '';
    $scope.book.author = '';
    $scope.book.genre = '';
    $scope.book.stars = '';
    $scope.book.comments = '';
  };//End of add Book

  $scope.categoryNames = ['Need to Buy', 'Need to Read', 'Already Have'];
}]);//End of controller

myApp.controller('aboutController', ['$scope', '$http', function ($scope, $http) {
  console.log('Yep...');
}]);//end of about Controller

myApp.controller('sortBookController', ['$scope', '$http', function ($scope, $http) {
  $scope.getBooks = function () {
    $http({
      method: 'GET',
      url: '/getBooks',
    }). then(function (response) {
      $scope.allTheBooks = response.data;
    });//End of http call
  };//end of get books function

  $scope.categoryNames = ['', 'Need to Buy', 'Need to Read', 'Already Have'];

  $scope.eBookFilter = function () {

  };//end of ebook filter

  $scope.deleteBook = function (id) {
    console.log('deleted button pressed!', id);
    $http.delete('/deleteBook/' + id).success(function(response){
      $scope.getBooks();
    });

  };//end of delete book function

  $scope.update = function( book ){
    console.log('figuring things out... ' , book);
    var dataSend = {
      book: $scope.allTheBooks
    };//end of dataSend
    $http({
      method: 'PUT',
      url: '/bookUpdate/' + book,
      data: dataSend,
    }).then(function successCallback(response) {
      console.log('Success');
    }).catch(function onReject(errorResponse) {
      console.log(errorResponse.status);
      throw errorResponse;
    });//end of http call
  };//end of Update

  $scope.saveUser = function () {
    console.log('Pressed the edit button');
    console.log('allTheBooks', $scope.allTheBooks);
    // change the 0 below to the index of the editd book in the array
    console.log('id maybe?', $scope.allTheBooks[0]._id);
    // var updateBook = {
    //   title: $scope.book.title,
    //   category: $scope.book.category,
    //   eBook: $scope.book.eBook,
    //   volume: $scope.book.volume,
    //   author: $scope.book.author,
    //   genre: $scope.book.genre,
    //   stars: $scope.book.stars,
    //   comments: $scope.book.comments
    // };//end of updatedBook
    // $http({
    //   method: 'POST',
    //   url: '/bookUpdate',
    //   data: updateBook
    // });//end of http call
  };//End of updateBook function
}]);//end of sort book controller
