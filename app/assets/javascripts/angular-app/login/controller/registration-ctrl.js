angular.module('projectToDoApp').controller('RegistrationModalInstanceCtrl',[ '$uibModalInstance','$auth' ,function ($uibModalInstance,$auth) {
  var $ctrl = this;

  $ctrl.user = {};
  $ctrl.validationErrors = [];


  $ctrl.submit = function (form) {
    if(form.$invalid){
      return;
    }
    $ctrl.validationErrors = [];
    $auth.submitRegistration($ctrl.user).then(function(resp) {
          console.log(resp);
          // handle success response
          $uibModalInstance.close(resp);
        })
        .catch(function(resp) {
          $ctrl.validationErrors = resp.data.errors.full_messages;
          // handle error response
        });
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };





}]);
