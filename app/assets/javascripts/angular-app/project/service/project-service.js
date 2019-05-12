angular.module('projectToDoApp').factory ('ProjectService', ['$resource', function($resource) {
  return $resource('/projects/:id/:action',
    {id: '@id'}, {
    query: {isArray: false},
    update: { method: "PUT"},
    memberships: {params: {action: "members"}, method: "GET"},
    addMember: {params: {action: "add_member"}, method: "POST"},
    removeMember: {params: {action: "remove_member"}, method: "DELETE"}
  });

}]);
