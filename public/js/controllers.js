define(['angular'], function(angular){
    angular.module('app.controllers', [])

    .controller("MainCtrl", function($scope, $timeout, ApiService){
    
      ApiService.subscribe($scope);
      
      function reorder(index, fn){
        var productId = $scope.products[index]._id;
        var val = fn($scope.products);
        ApiService.update(productId, {priority: val}, index);
       
      }
    
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
        ApiService.create($scope.newProduct)
      };
    
      $scope.remove = function(index){
        var id = $scope.products[index]._id;
        ApiService.remove(id, index);
      };
    
      ApiService.getAll();
    });

});
