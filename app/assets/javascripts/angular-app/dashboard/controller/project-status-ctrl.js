angular.module('projectToDoApp').controller('DashboardProjectsController', ['$scope','$uibModal','gridData','ProjectService', function ($scope,$uibModal,gridData,ProjectService) {

  var $ctrl = this;

  $ctrl.gridData = gridData;

  $scope.columnChartObject = {};
  $scope.columnChartObject.type = "ColumnChart";

  var cols = [
     {id: "p", label: "Project", type: "string"},
   ];

   angular.forEach($ctrl.gridData.y_axis,function(status){
     cols.push({id: status.name, label: status.display_name, type: "number"})
   })


   var rows = [];

   angular.forEach($ctrl.gridData.x_axis, function(project,xIndex){

     var rowData = [ { v:  project.name + ' (Group: ' +project.group.name+') ' } ];

     angular.forEach(gridData.table[xIndex],function(status){
       rowData.push( { v: status.length})
     });

     rows.push( {c: rowData } );
   })

  $scope.columnChartObject.data = {"cols": cols, "rows": rows};


}]);
