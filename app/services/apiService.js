angular.module('chathamWeather.apiService', []).service('apiService', ['$http' , function($http) {
    this.apiAddr = "http://178.79.140.126/api";

    this.searchByName = function (name) {
        return $http.get(this.apiAddr + "/cities/search", {params: {byName: name}});
    }
}]);