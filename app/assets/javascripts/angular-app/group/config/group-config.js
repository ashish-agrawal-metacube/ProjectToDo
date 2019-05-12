angular.module('projectToDoApp').config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('container.user.group', {
          url: "/groups",
          controller: "GroupController",
          controllerAs: '$ctrl',
          templateUrl: "angular-app/group/views/group.html",
          resolve: {
            myGroups: ['GroupService',function(GroupService){
              return GroupService.query({role: "owner"}).$promise;
            }],
            membershipGroups: ['GroupService',function(GroupService){
              return GroupService.query({role: "member"}).$promise;
            }]
          }
        })
}]);
