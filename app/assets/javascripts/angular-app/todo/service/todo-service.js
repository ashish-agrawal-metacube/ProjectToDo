angular.module('projectToDoApp').factory ('TodoService', ['$resource', function($resource) {
  return $resource('/todos/:id/:action',
    {id: '@id'}, {
    query: {isArray: false},
    update: { method: "PUT"}
  });

}]);
