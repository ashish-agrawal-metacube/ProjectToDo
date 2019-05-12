angular.module('projectToDoApp').controller('LoginModalInstanceCtrl',[ '$uibModalInstance','$auth' ,function ($uibModalInstance,$auth) {
  var $ctrl = this;

  $ctrl.user = {};
  $ctrl.loginErrors = [];


  $ctrl.submit = function (form) {
    if(form.$invalid){
      return;
    }
    $ctrl.loginErrors = [];
    $auth.submitLogin($ctrl.user).then(function(resp) {
          console.log(resp);
          // handle success response
          $uibModalInstance.close(resp);
        })
        .catch(function(resp) {
          $ctrl.loginErrors = resp.errors;
          // handle error response
        });
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };





}]);
