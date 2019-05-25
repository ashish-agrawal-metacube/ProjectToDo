angular.module('projectToDoApp').config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/members_view');

    $stateProvider
        .state('container.user.dashboard', {
            url: '/dashboard',
            templateUrl: "angular-app/dashboard/views/dashboard.html",
            controller: "DashboardController",
            controllerAs: '$ctrl'
          })
        .state('container.user.dashboard.members_table', {
            url: '/members_view',
            templateUrl: "angular-app/dashboard/views/project-members-view.html",
            controller: "DashboardProjectMembersController",
            controllerAs: '$ctrl',
            resolve: {
              projects: ['ProjectService',function(ProjectService){
                return ProjectService.query().$promise;
              }]
            }

          })
          .state('container.user.dashboard.projects_table', {
              url: '/projects_view',
              templateUrl: "angular-app/dashboard/views/project-status-view.html",
              controller: "DashboardProjectsController",
              controllerAs: '$ctrl',
              resolve: {
                gridData: ['ProjectService',function(ProjectService){
                  return ProjectService.statusVsProjectView().$promise
                }]
              }

            })

}]);
