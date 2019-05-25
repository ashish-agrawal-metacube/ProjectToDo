angular.module('projectToDoApp', [
        'ngResource',
        'ngAnimate',
        'templates', // Angular rails templates module
        'ui.router',
        'angular-loading-bar',
        'ng-token-auth',
        'ui.bootstrap',
        'googlechart'
    ]);

angular.module('projectToDoApp')
      .run(['$http','$state','$transitions',function($http,$state,$transitions){

        $transitions.onError({}, function(transition) {
          if(transition.error().detail!==undefined && transition.error().detail.status==401){
            $state.go("container.public.home");
          }
        });


      }]);

// angular.module('projectToDoApp').config(["$httpProvider", function($httpProvider){
//     $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
//   }]);

angular.module('projectToDoApp')
      .controller('RootController',['$scope',function($scope){

      }]);
