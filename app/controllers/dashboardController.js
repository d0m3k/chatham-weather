'use strict';

angular.module('chathamWeather.dashboard', [])
  .controller('dashboardController', ['$scope', '$rootScope', '$routeParams', 'localStorageService', 'apiService',
    function ($scope, $rootScope, $routeParams, localStorageService, apiService) {

      init();

      function init() {
        if ($routeParams.placeId) { 
          $scope.currentCityId = $routeParams.placeId;
        } else {
          $scope.currentCityId = localStorageService.getDefaultId();
        }
        
        if(!$scope.currentCityId) return;

        $scope.isCelsius = localStorageService.getIsCelsius();
        $scope.provider = localStorageService.getProvider();

        try {
          $scope.city = localStorageService.getCityDetails($scope.currentCityId);
          $rootScope.pageTitle = $scope.city.description + " | ";
          getForecast();
        } catch (err) {
          console.log(err);
          cityFallback();
        }
      }

      function getForecast() {
        apiService
          .getForecast($scope.city.latitude, $scope.city.longitude, $scope.provider)
          .then(function (r) {
            $scope.forecast = r.data;
          });
      }

      //in case there is no current town in ls...
      function cityFallback() {
        if (!$scope.currentCityId) return;
        apiService.getCityDetails($scope.currentCityId)
          .then(function (r) {
            if (r.data.status === "INVALID_REQUEST") {
              $scope.error = true;
            } else {
              var city = r.data.result;
              $scope.city = {};
              $scope.city.place_id = $scope.currentCityId;
              $scope.city.description = city.formatted_address;
              $scope.city.latitude = city.geometry.location.lat;
              $scope.city.longitude = city.geometry.location.lng;
              $rootScope.pageTitle = $scope.city.description + " | ";

              getForecast();
            }
          });
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