'use strict';

// Declare app level module which depends on views, and components
  angular.module('chathamWeather', [
  'ngRoute',
  'chathamWeather.helloView',
  'chathamWeather.dashboard',
  'chathamWeather.apiService']).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
    $routeProvider.when('/', {
        templateUrl: 'views/view1.html',
        controller: 'View1Ctrl'
    }).when('/dashboard', {
        templateUrl: 'views/view2.html',
        controller: 'View2Ctrl'
    }).otherwise({redirectTo: '/'});
}]);
