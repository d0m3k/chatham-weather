angular.module('chathamWeather.temperature', [])
  .filter('temp', function () {
    return function (input, toCelsius, hideSign) {
      var resTemp = input;
      var tempSign = "";
      if(!hideSign)
        tempSign = toCelsius ? "°C" : "°F";
      if(toCelsius)
          resTemp = ((5/9) * (input-32)).toFixed(1);
      return resTemp + tempSign;
    }
  });