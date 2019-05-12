angular.module('projectToDoApp').config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('container.user.dashboard', {
            url: '/dashboard',
            templateUrl: "angular-app/dashboard/views/dashboard.html"
          })
}]);
