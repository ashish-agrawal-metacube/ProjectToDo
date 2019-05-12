angular.module('projectToDoApp').controller('ProjectMemberModalInstanceCtrl',['$scope', '$uibModalInstance','project','member','ProjectService' ,function ($scope,$uibModalInstance,project,member,ProjectService) {
  var $ctrl = this;

  $ctrl.errors = [];


  $ctrl.project = project;
  $ctrl.member = member;

  $ctrl.roles = [{ name: "Admin(Project Manager)", value: "admin" },
                { name: "Developer", value: "developer"} ];

  $ctrl.member.role = $ctrl.roles[1];

  $ctrl.submit = function (form) {
    if(form.$invalid){
      return;
    }
    $ctrl.errors = [];

    ProjectService.addMember({id: $ctrl.project.id, email: $ctrl.member.email, role: $ctrl.member.role.value}).$promise.then(function(resp) {
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
