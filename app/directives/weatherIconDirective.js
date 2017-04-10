'use strict';

angular.module('chathamWeather.weatherIcon', [])
  .directive('weatherIcon', function (){
    return {
      restrict: 'A',
      scope: {
        night: '=night'
      },
      link: function(scope, element, attrs) {
        // TODO - little [but favourable] touch would be checking what time is it, if night is not provided... ;)
        attrs.$observe('clouds', function (clouds) {

          element.removeAttr("class");
          element.addClass("wi wi-fc");

          if(clouds<0.1)
            element.addClass(attrs.night?"wi-night-clear":"wi-day-sunny");
          else if(clouds<0.5)
            element.addClass(attrs.night?"wi-night-alt-partly-cloudy":"wi-day-sunny-overcast");
          else if(clouds<0.7)
            element.addClass(attrs.night?"wi-night-alt-cloudy-high":"wi-day-cloudy-high");
          else
            element.addClass(attrs.night?"wi-night-alt-cloudy":"wi-day-cloudy");
        
      });
      }
    }
  })