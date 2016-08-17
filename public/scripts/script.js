myApp = angular.module('myApp', ['ngRoute']);

myApp.controller('mainPage', ['$scope', '$http', function ($scope, $http) {

  $scope.addBook = function () {
    var newBook = {
      title: $scope.title,
      volume: $scope.volume,
      author: $scope.author,
      genre: $scope.genre,
      stars: $scope.stars,
      comments: $scope.comments
    };//end of array
    console.log('new book goes here please and thank you....', newBook);
    $http({
      method: 'POST',
      url: '/bookPost',
      data: newBook
    });//end of http call
    $scope.title = '';
    $scope.volume = '';
    $scope.author = '';
    $scope.genre = '';
    $scope.stars = '';
    $scope.comments = '';
  };//End of add Book
}]);//End of controller
