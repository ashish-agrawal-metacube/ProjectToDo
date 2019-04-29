angular.module('projectToDoApp').factory('errorInterceptor',['$q', '$state',function($q,$state) {
  return {

  'responseError': function(response) {
         if (response.status === 401  ) {
          $state.go("container.public.login")
         }
         if (response.status === 403  ) {
           $state.go("container.user.forbidden")
         }
         return $q.reject(response);
     }
  };
}]);
