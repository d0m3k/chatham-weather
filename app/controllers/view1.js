'use strict';

angular.module('chathamWeather.helloView', [])
.controller('View1Ctrl', ['$scope', '$location', 'apiService', function($scope, $location, apiService) {
  var i = 3;


  if(i==5) {
    $location.path('dashboard')
  }

  $scope.filterCities = function () {
    apiService.searchByName($scope.search.city)
      .then(function (r) {
        console.log(r);
         $scope.search.results = r.data.predictions;
      })
  }
}]);