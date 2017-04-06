'use strict';

angular.module('chathamWeather.cityList', [])
.controller('cityListController', ['$scope', '$rootScope', '$location', 'apiService', 'localStorageService',
    function($scope, $rootScope, $location, apiService, localStorageService) {

    // $location.path('dashboard')

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
              $rootScope.savedCities = localStorageService.getCityList();
          });
  };

    $rootScope.savedCities = localStorageService.getCityList();
}]);