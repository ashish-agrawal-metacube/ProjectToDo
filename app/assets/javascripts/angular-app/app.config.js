angular.module('projectToDoApp').config(['$stateProvider','$urlRouterProvider', 'cfpLoadingBarProvider', '$httpProvider',function($stateProvider,$urlRouterProvider,cfpLoadingBarProvider,$httpProvider) {

  cfpLoadingBarProvider.includeSpinner = false;
  cfpLoadingBarProvider.loadingBarTemplate = '<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>';

  // $httpProvider.interceptors.push('errorInterceptor');
  $urlRouterProvider.otherwise('/');

  var containerState = {
    name: 'container',
    abstract: true,
    templateUrl: "angular-app/layout/application.html"
  }

  var containerPublicState = {
    name: 'container.public',
    abstract: true,
    template: '<ui-view />',
  }

  var containerUserState = {
   name: 'container.user',
   abstract: true,
   templateUrl: "angular-app/dashboard/views/home.html"
  }

  var containerPublicHomeState = {
    name: 'container.public.home',
    url: '/',
    templateUrl: "angular-app/landing/views/home.html",
    controller: "HomeCtrl"
  }

  var forbiddenState = {
    name: 'container.user.forbidden',
    url: '/not_allowed',
    templateUrl:"angular-app/common/views/403.html"
  }

  $stateProvider.state(containerState);
  $stateProvider.state(containerPublicState);
  $stateProvider.state(containerUserState);
  $stateProvider.state(containerPublicHomeState);
  $stateProvider.state(forbiddenState);

}]);
