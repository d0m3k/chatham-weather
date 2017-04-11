'use strict';

angular.module('chathamWeather.dashboard', [])
    .controller('dashboardController', ['$scope', '$rootScope', '$interval', '$routeParams', 'localStorageService', 'apiService',
        function ($scope, $rootScope, $interval, $routeParams, localStorageService, apiService) {
            init();

            function getForecast() {
                apiService
                    .getForecast($scope.city.latitude, $scope.city.longitude, $rootScope.provider)
                    .then(function (r) { //success handler
                        $scope.forecast = r.data;

                        $scope.invalidRequestError = false;
                        $scope.serverFailError = false;
                    }, function () { //failure handler
                        $scope.serverFailError = true;
                    });
            }

            //in case there is no current town in ls...
            function cityFallback() {
                apiService.getCityDetails($scope.currentCityId)
                    .then(function (r) {
                        if (r.data.status === "INVALID_REQUEST") {
                            $scope.invalidRequestError = true;
                        } else {
                            var city = r.data.result;
                            $scope.city = {};
                            $scope.city.place_id = $scope.currentCityId;
                            $scope.city.description = city.formatted_address;
                            $scope.city.latitude = city.geometry.location.lat;
                            $scope.city.longitude = city.geometry.location.lng;

                            document.title = $scope.city.description + " |  Chatham Weather";
                            getForecast();
                        }
                    });
            }

            function init() {
                if ($routeParams.placeId) {
                    $scope.currentCityId = $routeParams.placeId;
                } else {
                    $scope.currentCityId = localStorageService.getDefaultId();
                }

                if (!$scope.currentCityId && !$scope.serverFailError && !$scope.invalidRequestError)
                    window.location.replace("#!/locations");

                $rootScope.isCelsius = localStorageService.getIsCelsius();
                $rootScope.provider = localStorageService.getProvider();

                try {
                    $scope.city = localStorageService.getCityDetails($scope.currentCityId);
                    document.title = $scope.city.description + " |  Chatham Weather";
                    getForecast();
                } catch (err) {
                    cityFallback();
                }
            }

            $scope.addCity = function (city) {
                localStorageService.addCity(city);
                $rootScope.$emit('updateMenu');
            };

            $scope.removeCity = function (city) {
                localStorageService.removeCity(city.place_id);
                $rootScope.$emit('updateMenu');
            };

            $scope.setDefault = function (place_id) {
                localStorageService.setDefaultId(place_id);
                $rootScope.$emit('updateMenu');
            };

            var refreshInterval = $interval(function () {
                getForecast();
            }, 60 * 1000);

            $scope.$on('$destroy', function () {
                $interval.cancel(refreshInterval);
            });
        }
    ]);