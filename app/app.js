'use strict';

// Declare app level module which depends on views, and components
angular.module('chathamWeather', [
    'ngRoute',
    'angular-cache',
    'chathamWeather.menu',
    'chathamWeather.cityList',
    'chathamWeather.dashboard',
    'chathamWeather.apiService',
    'chathamWeather.temperature',
    'chathamWeather.formatDate',
    'chathamWeather.weatherIcon',
    'chathamWeather.localStorageService'
]).
config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/dashboard/:placeId?', {
        templateUrl: 'views/dashboard.html',
        controller: 'dashboardController'
    }).when('/locations/:searchCity?', {
        templateUrl: 'views/cityList.html',
        controller: 'cityListController'
    }).otherwise({
        redirectTo: '/dashboard'
    });
}]);