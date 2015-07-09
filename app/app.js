'use strict';

// Declare app level module which depends on views, and components
angular.module('hereComesTheSun', [
  'ngRoute',
  'hereComesTheSun.sunrise',
  'hereComesTheSun.view2',
  'hereComesTheSun.version',
  'angularMoment'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/sunrise'});
}]);
