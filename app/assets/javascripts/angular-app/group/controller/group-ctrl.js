angular.module('projectToDoApp').controller('GroupController', ['$scope','$uibModal','myGroups','membershipGroups','$state','GroupService','ProjectService', function ($scope,$uibModal,myGroups,membershipGroups,$state,GroupService,ProjectService) {

  var $ctrl = this;

  $ctrl.animationsEnabled = true;

  $ctrl.myGroups = myGroups.groups;
  $ctrl.membershipGroups = membershipGroups.groups;

  $scope.newGroup = {};

  function groupCopy(group){
    return {id: group.id, name: group.name};
  }

  $scope.openGroupPopup = function (group,size ) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'angular-app/group/templates/group-update.html',
      controller: 'GroupModalInstanceCtrl',
      controllerAs: '$ctrl',
      keyboard: false,
      backdrop: 'static',
      size: size,
      resolve: {
        group: function(){
          return groupCopy(group);
        }
      }
    });

    modalInstance.result.then(function (user) {
      $state.reload();
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.newProject = {};
  $scope.openProjectPopup = function (group, project, size ) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'angular-app/project/templates/project-update.html',
      controller: 'ProjectModalInstanceCtrl',
      controllerAs: '$ctrl',
      keyboard: false,
      backdrop: 'static',
      size: size,
      resolve: {
        group: function(){
          return groupCopy(group);
        },
        project: function(){
          return angular.copy(project);
        }
      }
    });

    modalInstance.result.then(function (user) {
      $state.reload();
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openMembers = function(project){
    $state.go('container.user.project-members', {projectId: project.id});
  }

  $scope.deleteGroup = function(group){

    if( confirm("All projects, todos, and memberships associated with this group will be removed. Are you sure you want to delete this group?") ){
        GroupService.delete({id: group.id}).$promise.then(function(resp) {
            console.log(resp);
            // handle success response
            $state.reload();
          })
          .catch(function(resp) {
            alert(resp.data.errors);
            // handle error response
          });
    }

  };

  $scope.deleteProject = function(project){

    if( confirm("You are about to permanently delete the project \""+project.name+"\". This will delete all associated todos and memberships. Are you sure you want to do this?") ){
        ProjectService.delete({id: project.id}).$promise.then(function(resp) {
            console.log(resp);
            // handle success response
            $state.reload();
          })
          .catch(function(resp) {
            alert(resp.data.errors);
            // handle error response
          });
    }
  };


}]);
