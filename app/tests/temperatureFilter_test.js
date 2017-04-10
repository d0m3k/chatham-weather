'use strict';
describe('temp filter tests', function () {

  var $filter;

  beforeEach(function () {
    module('chathamWeather.temperature');

    inject(function (_$filter_) {
      $filter = _$filter_;
    });
  });

  it('Should just add °F given single argument', function () {
    // given
    var val = '67',
      result;

    // when
    result = $filter('temp')(val);

    // then
    expect(result).toEqual('67°F');
  });

  it('Should convert to Celsius and view with °C, rounding to 1 after point', function () {
    // given
    var val = '50',
      result;

    // when
    result = $filter('temp')(val, true);

    // then
    expect(result).toEqual('10.0°C');
  })

  it('Should leave it in Fahrenheit, but without description fiven third parameter', function () {
    // given
    var val = '30',
      result;

    // when
    result = $filter('temp')(val, false, true);

    // then
    expect(result).toEqual('30');
  })
});