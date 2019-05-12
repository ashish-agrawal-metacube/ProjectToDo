angular.module('projectToDoApp').controller('TodoModalInstanceCtrl',['$scope', '$uibModalInstance','$filter','project','todo','memberships','TodoService' ,function ($scope,$uibModalInstance,$filter,project,todo,memberships,TodoService) {
  var $ctrl = this;

  $ctrl.errors = [];


  $ctrl.project = project;
  $ctrl.todo = todo;
  $ctrl.memberships = memberships.memberships;

  $ctrl.todoTypes = [{name: "Feature", value: "feature" },
                    {name: "Bug", value: "bug"},
                    {name: "Task", value: "task"}];

  $ctrl.statusTypes = [{name: "New", value: "new" },
                    {name: "In Progress", value: "in_progress"},
                    {name: "Done", value: "done"}];

  if(!angular.isDefined($ctrl.todo.id) ){
      $ctrl.todo.todo_type = "feature";
      $ctrl.todo.status = "new";
  }else{
    // console.log($filter('filter')($ctrl.memberships,{user: {id: $ctrl.todo.assignee.id}} ));
    $ctrl.todo.assignee = $filter('filter')($ctrl.memberships,{user: {id: $ctrl.todo.assignee_id}})[0];
  }

  var callService = function(){
    if(angular.isDefined($ctrl.todo.id)) {
      return TodoService.update({id: $ctrl.todo.id,todo: $ctrl.todo}).$promise;
    }else{
      return TodoService.save({project_id: $ctrl.project.id, todo: $ctrl.todo}).$promise;
    }
  };


  $ctrl.submit = function (form) {
    if(form.$invalid){
      return;
    }
    if(!angular.isObject($ctrl.todo.assignee) ){
      $ctrl.errors = ["Assignee is not valid."];
      return;
    }
    $ctrl.todo.assignee_id = $ctrl.todo.assignee.user.id;

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
