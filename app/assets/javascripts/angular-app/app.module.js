angular.module('projectToDoApp', [
        'ngResource',
        'ngAnimate',
        'templates', // Angular rails templates module
        'ui.router',
        'angular-loading-bar'
    ]);

angular.module('projectToDoApp')
      .run(['$http',function($http){

      }]);

angular.module('projectToDoApp').config(["$httpProvider", function($httpProvider){
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }]);

angular.module('projectToDoApp')
      .controller('RootController',['$scope',function($scope){

      }]);
