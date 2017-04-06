'use strict';

// Declare app level module which depends on views, and components
  angular.module('chathamWeather', [
  'ngRoute',
  'chathamWeather.cityList',
  'chathamWeather.dashboard',
  'chathamWeather.apiService',
  'chathamWeather.temperature',
  'chathamWeather.localStorageService']).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
    $routeProvider.when('/dashboard/:placeId?', {
        templateUrl: 'views/dashboard.html',
        controller: 'dashboardController'
    }).when('/locations', {
        templateUrl: 'views/cityList.html',
        controller: 'cityListController'
    }).otherwise({redirectTo: '/dashboard'});
}]);
