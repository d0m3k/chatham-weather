Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
};

/* saved cities are stored as:
 "default" = "[place_id]"
   var cities = {

       "[place_id]": {
           place_id: "ChIJLwPMoJm1RIYRetVp1EtGm10",
           description: "Kraków, Polska",
           latitude: "50.06465009999999",
           longitude: "19.9449799"
       }, ... ]
   };
 */

angular.module('chathamWeather.localStorageService', [])
    .service('localStorageService', function() {

    //    single city is stored as
    // TODO - handle not having local storage
    // TODO - handle removing
    // TODO - handle changing default
    // TODO - enhance error handling; in case of getting default, fe. errors should be thrown if not found;
    // TODO - fallback to cookies if LS not available
    // above should probably be done by another viewController, that would alter list. Or maybe modal?
    this.getCityList = function () {
        var storage = localStorage.getObject("cityList");
        return storage && storage.cities;
    };

    this.getDefaultId = function () {
        var storage = localStorage.getObject("cityList");
        return storage && storage.default;
    };

    this.getCityDetails = function (place_id) {
        var storage = localStorage.getObject("cityList");
        return storage && storage.cities[place_id];
    };

    this.addCity = function (city) {
       var storage = localStorage.getObject("cityList");
       if(storage == null) {
           storage = {};
           storage.cities = {};
           storage.default = city.place_id;
       }
       storage.cities[city.place_id] = city;
       localStorage.setObject("cityList", storage);
    };

    this.setIsCelsius = function (isCelsius) {
        localStorage.setItem("tempInC", isCelsius);
    }

    this.getIsCelsius = function () {
        var item = localStorage.getItem("tempInC");
        return item==='true';
    }

    this.setProvider = function (provider) {
        localStorage.setItem("provider", provider);
    }

    this.getProvider = function () {
        var item = localStorage.getItem("provider");
        return item || "FORECAST_IO";
    }

});