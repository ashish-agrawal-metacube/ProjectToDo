angular.module('projectToDoApp').controller('DashboardProjectMembersController', ['$scope','$uibModal','projects','ProjectService', function ($scope,$uibModal,projects,ProjectService) {

  var $ctrl = this;

  $ctrl.projects = projects.projects;

  angular.forEach($ctrl.projects, function(project){
    project.name_with_group = project.name + " (Group: " +project.group.name+") ";
  });

  $ctrl.selectedProject = $ctrl.projects[0];



  $scope.loadView = function(){
      resetViewData();
      ProjectService.statusVsAssigneeView({id: $ctrl.selectedProject.id}).$promise.then(function(resp){
        $ctrl.gridData = resp;
        initPieChart( $ctrl.selectedProject,$ctrl.gridData);
      }).catch(function(resp) {

        // handle error response
      });

  };

  function resetViewData(){
    $ctrl.gridData = null;
    $scope.projectChartObject = null;
  }

  var initPieChart = function(project,gridData){
      $scope.projectChartObject = {};
      $scope.projectChartObject.type = "PieChart";

      var rowData = [];

      angular.forEach(gridData.y_axis, function(status,yIndex){
        var taskCount = 0;
        angular.forEach(gridData.table,function(row){
          taskCount+= (row[yIndex].length);
        });
        rowData.push( {c: [ {v: status.display_name}, {v: taskCount}] } );
      })

      angular.forEach(gridData.table,function(row){


      });

      $scope.projectChartObject.data = {"cols": [
         {id: "t", label: "Status", type: "string"},
         {id: "s", label: "Slices", type: "number"}
       ], "rows": rowData};

     $scope.projectChartObject.options = {
        title: project.name + ' (Group: ' +project.group.name+') ',
        pieSliceText: 'value-and-percentage'
      };

  }

}]);
