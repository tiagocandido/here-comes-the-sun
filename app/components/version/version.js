'use strict';

angular.module('hereComesTheSun.version', [
  'hereComesTheSun.version.interpolate-filter',
  'hereComesTheSun.version.version-directive'
])

.value('version', '0.1');
