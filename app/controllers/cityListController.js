'use strict';

angular.module('chathamWeather.cityList', [])
    .controller('cityListController', ['$scope', '$rootScope', 'apiService', 'localStorageService',
        function ($scope, $rootScope, apiService, localStorageService) {
            document.title = "Chatham Weather";

            $scope.filterCities = function () {
                apiService.searchByName($scope.search.city)
                    .then(function (r) {
                        $scope.search.results = r.data.predictions;
                    })
            };

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

        }
    ]);