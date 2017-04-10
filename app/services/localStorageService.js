Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function (key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
};

/* saved cities are stored as:
   cities : {
       "[place_id]": {
           place_id: "ChIJLwPMoJm1RIYRetVp1EtGm10",
           description: "Kraków, Polska",
           latitude: "50.06465009999999",
           longitude: "19.9449799"
       }, ... ]
   };
 */

angular.module('chathamWeather.localStorageService', [])
    .service('localStorageService', function () {
        // TODO - handle not having local storage
        // TODO - fallback to cookies if LS not available

        this.getCityList = function () {
            var storage = localStorage.getObject("cityList");
            return storage && storage.cities;
        };

        this.getDefaultId = function () {
            return localStorage.getItem("defaultCity");
        };

        this.setDefaultId = function (place_id) {
            localStorage.setItem("defaultCity", place_id);
        };

        this.getCityDetails = function (place_id) {
            var storage = localStorage.getObject("cityList");
            try {
                return storage.cities[place_id];
            } catch (err) {
                console.log("Didn't get city!");
                throw "No city in storage.";
            }
        };

        this.addCity = function (city) {
            var storage = localStorage.getObject("cityList");
            if (storage == null) {
                storage = {};
                storage.cities = {};
                this.setDefaultId(city.place_id);
            }
            storage.cities[city.place_id] = city;
            localStorage.setObject("cityList", storage);
        };

        function getFirst(list) {
            return Object.keys(list)[0];
        }

        function isEmpty(list) {
            return Object.keys(list).length == 0;
        }

        this.removeCity = function (place_id) {
            var storage = localStorage.getObject("cityList");
            if (!storage)
                throw "No city list; removing impossible";

            delete storage.cities[place_id];

            if (isEmpty(storage.cities)) {
                localStorage.removeItem("cityList");
                localStorage.removeItem("defaultCity");
            } else {
                if (this.getDefaultId() == place_id)
                    this.setDefaultId(getFirst(storage.cities));

                localStorage.setObject("cityList", storage);
            }
        };

        this.setIsCelsius = function (isCelsius) {
            localStorage.setItem("tempInC", isCelsius);
        };

        this.getIsCelsius = function () {
            var item = localStorage.getItem("tempInC");
            return item === 'true';
        };

        this.setProvider = function (provider) {
            localStorage.setItem("provider", provider);
        };

        this.getProvider = function () {
            var item = localStorage.getItem("provider");
            return item || "FORECAST_IO";
        }

    });