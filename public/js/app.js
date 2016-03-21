//think about putting your code in a client folder--
//let the public holder hold vendor libraries
//this makes it clear where your code is, and where vendor code is
var app = angular.module('app', ['ngAnimate']);

app.controller("MainCtrl", function($scope, $http, $timeout){


  function getAll(fn){
    //how about if we do this without a callback-- instead 
    $http.get('/api')
    .then(function(products){
      if (fn)
        return fn(products.data);
      $scope.products = products.data;
    });
  }

  function reorder(index, fn){
    var productId = $scope.products[index]._id;
    var val = fn($scope.products);
    $scope.products.splice(index, 1);
    $http.put('/api/' + productId, {priority: val})
    .then(function(product){
      getAll(function(products){
        var ids = products.map(function(prod){
          return prod._id;
        });
        var insertAt = ids.indexOf(product.data._id);
        $scope.products.splice(insertAt, 0, product.data);
      });
    });
  }

  //shouldn't need it
  $scope.products = null;

  $scope.moveUp = function(index){
    reorder(index, function(products){
      return products[index-1].priority - 1;
    });

  };
  $scope.canMoveUp = function(index){
    return index > 0 && $scope.products[index-1].priority > 1;
  };

  $scope.moveDown = function(index){
    reorder(index, function(products){
      return products[index+1].priority + 1;
    });
  };

  $scope.create = function(){
    $http.post('/api', $scope.newProduct)
    .then(function(product){
      $scope.newProduct = {};
      if (product.data.errors){
        $scope.error = product.data.errors;
        $timeout(function(){
          $scope.error = null;
        }, 5000);
        return;
      }
      getAll(function(products){
        var ids = products.map(function(prod){
          return prod._id;
        });
        var insertAt = ids.indexOf(product.data._id);
        $scope.products.splice(insertAt, 0, product.data);
      });
    });
  };

  $scope.remove = function(index){
    $scope.flashindex = index;
    var id = $scope.products[index]._id;
    $http.delete('/api/' + id)
    .then(function(){
      getAll(function(products){
        $scope.flashindex = null;
        $scope.products.splice(index, 1);
      });
    });
  };



  getAll();
});
