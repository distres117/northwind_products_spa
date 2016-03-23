require.config({
  paths: {
    'angular': "/bower_components/angular/angular.min"
  },
  shim:{
    angular:{
      exports: 'angular'
    }
  }
})

require(['angular','controllers', 'directives', 'services'], function(angular){
  angular.bootstrap(document, ['app.controllers', 'app.directives', 'app.services'])
});