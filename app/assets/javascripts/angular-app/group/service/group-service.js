angular.module('projectToDoApp').factory ('GroupService', ['$resource', function($resource) {
  return $resource('/groups/:id/:action',
    {id: '@id'}, {
    query: {isArray: false},
    update: { method: "PUT"}
  });

}]);
