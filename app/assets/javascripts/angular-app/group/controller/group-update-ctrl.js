angular.module('projectToDoApp').controller('GroupModalInstanceCtrl',['$scope', '$uibModalInstance','group','GroupService' ,function ($scope,$uibModalInstance,group,GroupService) {
  var $ctrl = this;

  $ctrl.errors = [];

  $ctrl.group = group;

  var callService = function(){
    if(angular.isDefined($ctrl.group.id)) {
      return GroupService.update({id: $ctrl.group.id,group: $ctrl.group}).$promise;
    }else{
      return GroupService.save({group: $ctrl.group}).$promise;
    }
  };

  $ctrl.submit = function (form) {
    if(form.$invalid){
      return;
    }
    $ctrl.errors = [];

    callService().then(function(resp) {
          console.log(resp);
          // handle success response
          $uibModalInstance.close(resp);
        })
        .catch(function(resp) {
          $ctrl.errors = resp.data.errors;
          // handle error response
        });
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };





}]);
