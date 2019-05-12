angular.module('projectToDoApp').config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('container.user.project', {
          url: "/projects/:projectId",
          controller: "ProjectController",
          controllerAs: '$ctrl',
          templateUrl: "angular-app/project/views/project.html",
          resolve: {
            projectId: ['$stateParams',function($stateParams){
                return $stateParams.projectId;
            }],
            project: ['projectId','ProjectService',function(projectId,ProjectService){
              return ProjectService.get({id: projectId}).$promise;
            }],
          }
        })
        .state('container.user.project-members', {
            url: "/projects/:projectId/memberships",
            controller: "ProjectMembershipController",
            controllerAs: '$ctrl',
            templateUrl: "angular-app/project/views/memberships.html",
            resolve: {
              projectId: ['$stateParams',function($stateParams){
                  return $stateParams.projectId;
              }],
              project: ['projectId','ProjectService',function(projectId,ProjectService){
                return ProjectService.get({id: projectId}).$promise;
              }],
              memberships: ['projectId','ProjectService',function(projectId,ProjectService){
                return ProjectService.memberships({id: projectId}).$promise;
              }],
            }
          })
}]);
