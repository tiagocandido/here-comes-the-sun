'use strict';

angular.module('hereComesTheSun.sunrise', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/sunrise', {
            templateUrl: 'sunrise/sunrise.html',
            controller: 'SunRiseCtrl'
        });
    }])
    .controller('SunRiseCtrl', ['$scope', '$http', '$interval', function($scope, $http, $interval){
        var from = moment().subtract(10, 'hours').format(),
            before = moment().format(),
            apiEndPoint = 'http://sensor-api.localdata.com/api/v1/aggregations?from=' + from + '&before='+ before +'&fields=light&resolution=5m&over.city=';

        $scope.cities = ["San Francisco", "Bangalore", "Boston", "Geneva", "Rio de Janeiro", "Shanghai", "Singapore"];
        var getSun = function(){
            $scope.lastSunRise = null;
            $scope.lastSunSet = null;
            angular.forEach($scope.cities, function(city, cities_index){
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
                                    if($scope.lastSunRise == null || moment(entry.timestamp).isAfter(moment($scope.lastSunRise.timestamp))){
                                        $scope.lastSunRise = entry;
                                    }
                                    keepGoing = false;
                                }
                                else{
                                    if($scope.lastSunSet == null || moment(entry.timestamp).isAfter(moment($scope.lastSunSet.timestamp))){
                                        $scope.lastSunSet = entry;
                                    }
                                    keepGoing = false;
                                }
                            }
                        }
                    });
                    if(cities_index == $scope.cities.length - 1){
                        getPhoto($scope.lastSunRise, 'sunrise');
                        getPhoto($scope.lastSunSet, 'sunset');
                    }
                });
            });
        };

        var getPhoto = function(entry, keyword){
            var city = entry.city.split(' ').join('+'),
                query = encodeURI(keyword + '+' + city),
                queryUrl = 'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q='+ encodeURI(query) + '&imgtype=photo&imgsz=xxlarge&callback=JSON_CALLBACK';
            if(!angular.isDefined(entry.photos)){
                entry.photos = [];
                $http.jsonp(queryUrl).success(function(response){
                    angular.forEach(response.responseData.results, function(photo){
                        entry.photos.push(photo.url);
                    });
                    entry.photo = entry.photos[Math.floor(Math.random() * 4)];
                })
            }
            else{
                entry.photo = entry.photos[Math.floor(Math.random() * 4)];
            }

        };

        getSun();
        $interval(getSun, 1000*60*5);
        $interval(function(){
            getPhoto($scope.lastSunRise, 'sunrise');
            getPhoto($scope.lastSunSet, 'sunset');
        }, 1000*30);

    }]);
