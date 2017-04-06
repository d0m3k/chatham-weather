'use strict';

angular.module('chathamWeather.dashboard', [])
.controller('dashboardController', ['$scope','$routeParams','localStorageService', 'apiService',
    function($scope,$routeParams, localStorageService, apiService) {

    //TODO - bring some sanity into variables names
    init();

    //in case there is no current town in ls... TODO - refactor to make it less ugly
    function cityFallback() {
        apiService.getCityDetails($scope.currentCityId)
            .then(function (r) {
                if(r.data.status==="INVALID_REQUEST") {
                    $scope.error = true;
                } else {
                    $scope.city = {};
                    $scope.city.place_id = $scope.currentCityId;
                    $scope.city.description = r.data.result.formatted_address;
                    $scope.city.latitude = r.data.result.geometry.location.lat;
                    $scope.city.longitude = r.data.result.geometry.location.lng;
                }
            });
    }

    function init () {
        $scope.currentCityId = $routeParams.placeId;
        if (!$scope.currentCityId) {
            $scope.currentCityId = localStorageService.getDefaultId();
        }
        $scope.city = localStorageService.getCityDetails($scope.currentCityId);
        if (!$scope.city && $scope.currentCityId) {
            cityFallback();
            return;
        }

        // TODO - make provider parametrizable
        apiService
            .getForecast($scope.city.latitude, $scope.city.longitude, "FORECAST_IO")
            .then(function (r) {
                $scope.forecast = r.data;
            })
    }


}]);