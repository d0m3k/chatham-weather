angular.module('chathamWeather.temperature', [])
    .directive('temperature', [ 'localStorageService', function(localStorageService) {
    //    TODO - make this handle celsius and fahrenheit
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            scope.$watch('temperatureFormat', function() {});

            ngModel.$formatters.push(function(f) {
                return (value - 32) * 5.0 / 9.0;
            });
            ngModel.$parsers.push(function(c) {
                return c * 9.0 / 5.0 + 32;
            });
        }
    };
}]);