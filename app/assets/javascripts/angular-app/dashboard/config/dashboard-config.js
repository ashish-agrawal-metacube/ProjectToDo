angular.module('projectToDoApp').config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('container.user.dashboard', {
            url: '/dashboard',
            templateUrl: "angular-app/dashboard/views/dashboard.html",
            controller: "DashboardController",
            controllerAs: '$ctrl',
            resolve: {
              projects: ['ProjectService',function(ProjectService){
                return ProjectService.query().$promise;
              }]
            }

          })
}]);
