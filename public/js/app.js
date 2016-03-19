var app = angular.module('app', []);

app.controller("MainCtrl", function($scope, $http){

  function getAll(){
    $http.get('/api')
    .then(function(products){
      $scope.products = products.data;
    });
  }

  function reorder(index, fn){
    console.log(index);
    var productId = $scope.products[index]._id;
    var val = fn($scope.products);
    $http.put('/api/' + productId, {priority: val})
    .then(function(){
      getAll();
    });
  }

  $scope.products = null;
  $scope.moveUp = function(index){
    reorder(index, function(products){
      return products[index-1].priority - 1;
    });

  };

  $scope.moveDown = function(index){
    reorder(index, function(products){
      return products[index+1].priority + 1;
    });
  };

  $scope.create = function(){
    $http.post('/api', $scope.newProduct)
    .then(function(){
      getAll();
    });
  };

  $scope.remove = function(index){
    var id = $scope.products[index]._id;
    $http.delete('/api/' + id)
    .then(function(){
      getAll();
    });
  };



  getAll();
});
