angular.module('projectToDoApp').controller('DashboardController', ['$scope','$uibModal','projects','ProjectService', function ($scope,$uibModal,projects,ProjectService) {

  var $ctrl = this;

  $ctrl.projects = projects.projects;

  angular.forEach($ctrl.projects, function(project){
    project.name_with_group = project.name + " (Group: " +project.group.name+") ";
  });

  $ctrl.selectedProject = $ctrl.projects[0];



  $scope.loadView = function(){
      ProjectService.statusVsAssigneeView({id: $ctrl.selectedProject.id}).$promise.then(function(resp){
        $ctrl.viewData = resp;
      }).catch(function(resp) {

        // handle error response
      });

  };

}]);
