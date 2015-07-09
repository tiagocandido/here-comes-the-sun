'use strict';

angular.module('hereComesTheSun.sunset', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sunset', {
    templateUrl: 'sunset/sunset.html',
    controller: 'SunRiseCtrl'
  });
}])

.controller('SunSetCtrl', [function() {

}]);