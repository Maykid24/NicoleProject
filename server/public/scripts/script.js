myApp = angular.module('myApp', ['ngRoute']);

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
      otherwise({
        redirectTo: "addBook"
      });
}]);//end of myApp config function


myApp.controller('addingBook', ['$scope', '$http', function ($scope, $http) {
  console.log("Making it to controller");
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

myApp.controller('aboutController', ['$scope', '$http', function ($scope, $http) {
  console.log('Yep...');
}]);//end of about Controller
