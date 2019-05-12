angular.module('projectToDoApp').controller('ProjectModalInstanceCtrl',['$scope', '$uibModalInstance','group','project','ProjectService' ,function ($scope,$uibModalInstance,group,project,ProjectService) {
  var $ctrl = this;

  $ctrl.errors = [];

  $ctrl.group = group;
  $ctrl.project = project;

  var callService = function(){
    if(angular.isDefined($ctrl.project.id)) {
      return ProjectService.update({id: $ctrl.project.id,project: $ctrl.project}).$promise;
    }else{
      return ProjectService.save({group_id: $ctrl.group.id, project: $ctrl.project}).$promise;
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
