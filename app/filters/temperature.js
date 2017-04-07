angular.module('chathamWeather.temperature', [])
  .filter('temp', function () {
    return function (input, toCelsius, hideSign) {
      var tempSign = ""
      if(!hideSign)
        var tempSign = toCelsius ? " °C" : " °F";
      if(toCelsius)
          input = ((5/9) * (input-32)).toFixed(1);
      return input + tempSign;
    }
  })