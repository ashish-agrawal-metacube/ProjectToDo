angular.module('projectToDoApp').controller('ProjectMembershipController', ['$scope','$uibModal','project','memberships','$state','ProjectService', function ($scope,$uibModal,project,memberships,$state,ProjectService) {

  var $ctrl = this;

  $ctrl.animationsEnabled = true;

  $ctrl.project = project.project;
  $ctrl.memberships = memberships.memberships;

  $scope.newMember = {};

  $scope.openMemberPopup = function (project, member,size ) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'angular-app/project/templates/member-update.html',
      controller: 'ProjectMemberModalInstanceCtrl',
      controllerAs: '$ctrl',
      keyboard: false,
      backdrop: 'static',
      size: size,
      resolve: {
        project: function(){
          return angular.copy(project);
        },
        member: function(){
          return angular.copy(member);
        }
      }
    });

    modalInstance.result.then(function (user) {
      $state.reload();
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.removeMember = function(membership){

    if( confirm("Are you sure you want to remove this member?") ){
        ProjectService.removeMember({id: $ctrl.project.id, user_id: membership.user.id}).$promise.then(function(resp) {
            console.log(resp);
            // handle success response
            $state.reload();
          })
          .catch(function(resp) {
            alert(resp.data.errors);
            // handle error response
          });
    }

  }

}]);
