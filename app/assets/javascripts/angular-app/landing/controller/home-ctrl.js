angular.module('projectToDoApp').controller('HomeCtrl', ['$scope','$auth' ,'$rootScope','$location','$uibModal','$state', function ($scope, $auth,$rootScope,$location,$uibModal,$state) {

  var $ctrl = this;

  $ctrl.animationsEnabled = true;

  $scope.gotoAnchor = function(newHash) {
    if ($location.hash() !== newHash) {
        // set the $location.hash to `newHash` and
        // $anchorScroll will automatically scroll to it
        // $location.hash(newHash);
        $location.path("/").hash(newHash);
      } else {
        // call $anchorScroll() explicitly,
        // since $location.hash hasn't changed
        $anchorScroll();
      }
  };


  $scope.openSignUp = function (size ) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'angular-app/login/templates/registration.html',
      controller: 'RegistrationModalInstanceCtrl',
      controllerAs: '$ctrl',
      keyboard: false,
      backdrop: 'static',
      size: size,
      resolve: {}
    });

    modalInstance.result.then(function (user) {
      alert("Your are successfully registered. Please login using the Signin button.")
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openSignIn = function (size ) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'angular-app/login/templates/login.html',
      controller: 'LoginModalInstanceCtrl',
      controllerAs: '$ctrl',
      keyboard: false,
      backdrop: 'static',
      size: size,
      resolve: {}
    });

    modalInstance.result.then(function (user) {
      $state.go('container.user.dashboard');
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };



}]);
