'use strict';

angular.module('chathamWeather.menu', [])
    .controller('menuController', ['$scope', '$rootScope', 'apiService', 'localStorageService',
        function ($scope, $rootScope, apiService, localStorageService) {
            document.title = "Chatham Weather";
            init();

            $scope.setDefault = function (place_id) {
                localStorageService.setDefaultId(place_id);
                $scope.defaultId = localStorageService.getDefaultId();
                init();
            };

            $scope.removeCity = function (place_id) {
                localStorageService.removeCity(place_id);
                init();
            };

            $rootScope.$on('updateMenu', function (){
                init();
            });

            function getDefaultWeather () {
              $scope.isCelsius = localStorageService.getIsCelsius();
              $scope.provider = localStorageService.getProvider();

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
        }
    ]);