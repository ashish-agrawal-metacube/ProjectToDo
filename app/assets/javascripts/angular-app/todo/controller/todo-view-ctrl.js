angular.module('projectToDoApp').controller('TodoViewModalInstanceCtrl',['$scope', '$uibModalInstance','project','todo' ,function ($scope,$uibModalInstance,project,todo) {
  var $ctrl = this;



  $ctrl.project = project;
  $ctrl.todo = todo;


  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };


}]);
