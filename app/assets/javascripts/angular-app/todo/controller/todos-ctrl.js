angular.module('projectToDoApp').controller('ProjectTodoController', ['$scope','$uibModal','project','todos','$state','ProjectService','TodoService', function ($scope,$uibModal,project,todos,$state,ProjectService,TodoService) {

  var $ctrl = this;

  $ctrl.animationsEnabled = true;

  $ctrl.project = project.project;
  $ctrl.todos = todos.todos;

  $scope.newTodo= {};



  $scope.openTodoPopup = function (project,todo,size ) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'angular-app/todo/templates/todo-update.html',
      controller: 'TodoModalInstanceCtrl',
      controllerAs: '$ctrl',
      keyboard: false,
      backdrop: 'static',
      size: size,
      resolve: {
        project: function(){
          return angular.copy(project);
        },
        todo: function(){
          return angular.copy(todo);
        },
        memberships: function(){
          return ProjectService.memberships({id: project.id}).$promise;
        }
      }
    });

    modalInstance.result.then(function (user) {
      $state.reload();
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.removeTodo = function(todo){

    if( confirm("Are you sure you want to delte this todo?") ){
        TodoService.delete({id: todo.id}).$promise.then(function(resp) {
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

  $scope.myTodos = false;

  $scope.loadMyTodos = function(){

    var params = {project_id: $ctrl.project.id } ;
    if(!$scope.myTodos){
      params['assignee_id'] = $scope.user.id;
    }

    TodoService.query(params).$promise.then(function(resp) {
      $ctrl.todos = resp.todos;
      $scope.myTodos = !$scope.myTodos;
    })
    .catch(function(resp) {

    });

  }

}]);
