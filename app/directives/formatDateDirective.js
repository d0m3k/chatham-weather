'use strict';

// <h1 f-date date="{{cast.date}}" format="day"></h1>

angular.module('chathamWeather.formatDate', [])
  .directive('fDate', function () {
    var daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];

    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        // TODO - little [but favourable] touch would be checking what time is it, if night is not provided... ;)
        attrs.$observe('date', function (date) {
            element.text(daysOfWeek[new Date(date).getDay()]);
        });
      }
    }
  })