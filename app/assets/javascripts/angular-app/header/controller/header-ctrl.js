angular.module('projectToDoApp').controller('HeaderCtrl', ['$scope','$auth' ,'$rootScope','$state', function ($scope, $auth,$rootScope,$state) {

  var $ctrl = this;


  $scope.signOut = function() {

      $auth.signOut()
        .then(function(resp) {
          $state.go("container.public.home");
        })
        .catch(function(resp) {
          // handle error response
        });
  };

  $scope.goTo = function(state){
    $state.go(state);
  }


}]);
