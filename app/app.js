'use strict';

// Declare app level module which depends on views, and components
angular.module('hereComesTheSun', [
  'ngRoute',
  'hereComesTheSun.view1',
  'hereComesTheSun.view2',
  'hereComesTheSun.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
