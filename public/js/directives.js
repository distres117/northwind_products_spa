define(['angular'], function(angular){
    angular.module('app.directives', ['app.services'])
    .directive('notifyDir', function(NotifyService){
        return{
            link: function(scope, elem, attr){
                scope.$watch(function(){
                    return NotifyService.active;
                }, function(){
                    if (NotifyService.active)
                        NotifyService.watchFn(elem, attr.notifyDir);
                })
            }
        }
    });
    
})