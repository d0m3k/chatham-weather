angular.module('chathamWeather.apiService',[])
.service('apiService', ['$http', 'CacheFactory', function ($http, CacheFactory) {
    this.apiAddr = "http://codingchallenge.chathamfinancial.com/api";

    CacheFactory('forecastCache', {
        deleteOnExpire: 'aggressive',
        maxAge: 30000
    });
    var forecastCache = CacheFactory.get('forecastCache');

    this.searchByName = function (name) {
        return $http.get(this.apiAddr + "/cities/search", {cache:true, params: {byName: name}});
    };

    this.getCityDetails = function (place_id) {
        return $http.get(this.apiAddr + "/cities/" + place_id, {cache:true});
    };

    this.getForecast = function (lat, long, src) {
        return $http.get(this.apiAddr + "/forecast",
            {   
                cache: forecastCache,
                params: {
                    latitude: lat,
                    longitude: long,
                    source: src
                }
            });
    }
}]);