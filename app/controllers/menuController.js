'use strict';

angular.module('chathamWeather.menu', [])
    .controller('menuController', ['$scope', '$rootScope', '$interval', 'apiService', 'localStorageService',
        function ($scope, $rootScope, $interval, apiService, localStorageService) {
            document.title = "Chatham Weather";
            init();

            $rootScope.$on('updateMenu', function () {
                init();
            });

            $scope.setTemp = function (temp) {
                $rootScope.isCelsius = temp === "C";
                localStorageService.setIsCelsius($scope.isCelsius);
                init();
            };

            $scope.setProvider = function (provider) {
                $rootScope.provider = provider === "F" ? "FORECAST_IO" : "WORLD_WEATHER";
                localStorageService.setProvider($scope.provider);
                init();
            };

            $scope.setDefault = function (place_id) {
                localStorageService.setDefaultId(place_id);
                $scope.defaultId = localStorageService.getDefaultId();
                init();
            };

            $scope.removeCity = function (place_id) {
                localStorageService.removeCity(place_id);
                init();
            };

            function getDefaultWeather() {
                $rootScope.isCelsius = localStorageService.getIsCelsius();
                $rootScope.provider = localStorageService.getProvider();

                if (!$scope.defaultId || !$scope.savedCities) { 
                    return; 
                }

                var def = $scope.savedCities[$scope.defaultId];
                apiService
                    .getForecast(def.latitude, def.longitude, $scope.provider)
                    .then(function (r) {
                        $scope.homeForecast = r.data;
                    });
            }

            function init() {
                $scope.savedCities = localStorageService.getCityList();
                $scope.defaultId = localStorageService.getDefaultId();
                getDefaultWeather();
            }

            var refreshInterval = $interval(function() {
                console.log("Refreshing menu!");
                getDefaultWeather();
            }, 60*1000);

            $scope.$on('$destroy', function(){
                $interval.cancel(refreshInterval);
            });
        }
    ]);