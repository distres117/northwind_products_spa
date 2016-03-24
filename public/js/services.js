define(['angular'], function(angular){
   angular.module('app.services', [])
   .service('ApiService', function($http, $timeout, NotifyService){
       var subscriptions = [];
       
       this.subscribe = function(scope){
           subscriptions.push(scope);
       }
       
       function iterSubscriptions(fn){
           subscriptions.forEach(function(scope){
               fn(scope);
           });
       }
       
       function throwError(error){
           iterSubscriptions(function(scope){
               scope.error = error;
           });
           NotifyService.notify('err', 'warn', 5000)
          .then(function(){
              iterSubscriptions(function(scope){
              scope.error = null;
                });
            });
   
       };
       
       this.getAll = function(id){
         $http.get('/api')
         .then(function(res){
             iterSubscriptions(function(scope){
                 scope.products = res.data;
             });
             if (id){
                var ids = res.data.map(function(it){
                  return it._id; 
                });
                var newIndex = ids.indexOf(id);
                NotifyService.notify(newIndex, 'flash');
             }
                
         })
       };
       
       this.create = function(product){
           var that = this;
           $http.post('/api', product)
           .then(function(res){
               iterSubscriptions(function(scope){
                  scope.newProduct = {}; 
               });
               if (res.data.errors)
                    return throwError(res.data.errors);
                that.getAll(res.data._id);
           })
       }
       
       this.remove = function(id, index){
           var that = this;
           NotifyService.notify(index, 'warn')
          .then(function(){
              return $http.delete('/api/' + id);
          }) 
          .then(function(){
             that.getAll(null);  
          });
           
       }
       
       this.update = function(id, data, index){
           var that = this;
           NotifyService.notify(index, 'flash')
           .then(function(){
               return $http.put('/api/' + id, data);
           })
           .then(function(){
              that.getAll(id); 
           });
       }
   })
    .service("NotifyService", function($q,$timeout){
        this.watchFn = null;
        this.active = false;
        var that = this;
        
        this.notify = function(targetindex, color, to){
            return $q(function(res,rej){
               that.watchFn = function(elem, index){
                   if (targetindex == index){
                       elem.addClass(color);
                       $timeout(function(){
                           elem.removeClass(color);
                           that.active = false;
                           res(index);
                       }, to || 500);
                   }
               }
               that.active = true;
            });
        }
    });
});