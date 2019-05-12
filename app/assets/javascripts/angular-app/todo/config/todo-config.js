angular.module('projectToDoApp').config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('container.user.project-todos', {
            url: "/projects/:projectId/todos",
            controller: "ProjectTodoController",
            controllerAs: '$ctrl',
            templateUrl: "angular-app/todo/views/todos-home.html",
            resolve: {
              projectId: ['$stateParams',function($stateParams){
                  return $stateParams.projectId;
              }],
              project: ['projectId','ProjectService',function(projectId,ProjectService){
                return ProjectService.get({id: projectId}).$promise;
              }],
              todos: ['projectId','TodoService',function(projectId,TodoService){
                return TodoService.query({project_id: projectId}).$promise;
              }],
            }
          })
}]);
