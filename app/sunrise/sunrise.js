'use strict';

angular.module('hereComesTheSun.sunrise', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/sunrise', {
            templateUrl: 'sunrise/sunrise.html',
            controller: 'SunriseCtrl'
        });
    }])
    .controller('SunriseCtrl', ['$scope', '$http', function($scope, $http){
        var from = moment().subtract(10, 'hours').format(),
            before = moment().format(),
            apiEndPoint = 'http://sensor-api.localdata.com/api/v1/aggregations?from=' + from + '&before='+ before +'&fields=light&resolution=5m&over.city=';

        $scope.cities = ["San Francisco", "Bangalore", "Boston", "Geneva", "Rio de Janeiro", "Shanghai", "Singapore"];
        $scope.sunRises = [];
        $scope.sunSets = [];
        $scope.getLastSunsets = function(){
            angular.forEach($scope.cities, function(city){
                var requestUrl = apiEndPoint + encodeURI(city), keepGoing = true;
                $http.get(requestUrl).success(function(response){
                    var entries = response.data;
                    angular.forEach(entries, function(entry, index){
                        if(keepGoing){
                            if(entry.light >= 10 && entry.light <= 35){
                                if(index >= 3) {
                                    entry.lightDelta = entry.light - entries[index - 3].light;
                                }
                                else {
                                    entry.lightDelta = entry.light - entries[index + 3].light;
                                }
                                if(entry.lightDelta >= 0){
                                    $scope.sunRises.push(entry);
                                    keepGoing = false;
                                }
                                else{
                                    $scope.sunSets.push(entry);
                                    keepGoing = false;
                                }
                            }
                        }
                    });
                });

            });

            //console.log(sunRises);
        };
        $scope.getLastSunsets();
    }]);

