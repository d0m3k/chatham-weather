'use strict';

angular.module('chathamWeather.dashboard', [])
  .controller('dashboardController', ['$scope', '$routeParams', 'localStorageService', 'apiService',
    function ($scope, $routeParams, localStorageService, apiService) {

      setUpData();
      init();

      function getForecast() {
        apiService
          .getForecast($scope.city.latitude, $scope.city.longitude, $scope.provider)
          .then(function (r) {
            $scope.forecast = r.data;
          });
      }

      function setUpData() {
        $scope.currentCityId = $routeParams.placeId;

        $scope.isCelsius = localStorageService.getIsCelsius();
        $scope.provider = localStorageService.getProvider();

        if (!$scope.currentCityId) {
          $scope.currentCityId = localStorageService.getDefaultId();
        }
        $scope.city = localStorageService.getCityDetails($scope.currentCityId);
      }

      //in case there is no current town in ls...
      function cityFallback() {
        if (!$scope.currentCityId) return;
        apiService.getCityDetails($scope.currentCityId)
          .then(function (r) {
            if (r.data.status === "INVALID_REQUEST") {
              $scope.error = true;
            } else {
              $scope.city = {};
              $scope.city.place_id = $scope.currentCityId;
              $scope.city.description = r.data.result.formatted_address;
              $scope.city.latitude = r.data.result.geometry.location.lat;
              $scope.city.longitude = r.data.result.geometry.location.lng;

              getForecast();
            }
          });
      }

      function init() {
        if (!$scope.city)
          cityFallback();
        else
          getForecast();
      }

      $scope.setTemp = function (temp) {
        $scope.isCelsius = temp === "C";
        localStorageService.setIsCelsius($scope.isCelsius);
        init();
      }

      $scope.setProvider = function (provider) {
        $scope.provider = provider === "F" ? "FORECAST_IO" : "WORLD_WEATHER";
        localStorageService.setProvider($scope.provider);
        init();
      }
    }
  ]);