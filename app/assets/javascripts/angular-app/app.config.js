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

  var containerPublicHomeState = {
    name: 'container.public.home',
    url: '/',
    templateUrl: "angular-app/landing/home.html",
  }

  var forbiddenState = {
    name: 'container.user.forbidden',
    url: '/not_allowed',
    templateUrl:"angular-app/common/views/403.html"
  }

  $stateProvider.state(containerState);
  $stateProvider.state(containerPublicState);
  $stateProvider.state(containerPublicHomeState);
  $stateProvider.state(forbiddenState);
}]);
