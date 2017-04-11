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
        attrs.$observe('date', function (date) {
            element.text(daysOfWeek[new Date(date).getDay()]);
        });
      }
    }
  });