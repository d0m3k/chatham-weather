'use strict';

angular.module('chathamWeather.cityList', [])
    .controller('cityListController', ['$scope', '$rootScope', '$route', '$routeParams', 'apiService', 'localStorageService',
        function ($scope, $rootScope, $route, $routeParams, apiService, localStorageService) {
            document.title = "Chatham Weather";

            $scope.filterCities = function () {
                apiService.searchByName($scope.search.city)
                    .then(function (r) { //success handler
                        $scope.search.results = r.data.predictions;

                        $scope.serverError = false;
                    }, function () { ///failure handler
                        $scope.serverError = true;
                    })
            };

            $scope.updateAddr = function () {
                $route.updateParams({
                    searchCity: $scope.search.city
                });
            };

            $scope.search = {};
            $scope.search.city = $routeParams.searchCity;
            $scope.filterCities();


            $scope.addCity = function (prediction) {
                var city = {
                    description: prediction.description,
                    place_id: prediction.place_id
                };

                apiService.getCityDetails(prediction.place_id)
                    .then(function (r) {
                        city.latitude = r.data.result.geometry.location.lat;
                        city.longitude = r.data.result.geometry.location.lng;

                        localStorageService.addCity(city);
                        $rootScope.$emit('updateMenu');
                    });
            };

            $scope.removeCity = function (city) {
                localStorageService.removeCity(city.place_id);
                $rootScope.$emit('updateMenu');
            }

        }
    ]);