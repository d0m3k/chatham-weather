describe('unit testing weatherIcon generating directive', function () {
  var $compile,
    $rootScope;

  beforeEach(module('chathamWeather.weatherIcon'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Should generate a big cloud', function () {
    //given
    var element = $compile('<i weather-icon clouds="1"></i>')($rootScope);
    //when
    $rootScope.$digest();
    //then
    expect(element.attr("class")).toContain("wi wi-fc wi-day-cloudy");
  });

  it('Should generate a big cloud AT NIGHT', function () {
    //given
    var element = $compile('<i weather-icon clouds="1" night="true"></i>')($rootScope);
    //when
    $rootScope.$digest();
    //then
    expect(element.attr("class")).toContain("wi wi-fc wi-night-alt-cloudy");
  });

  it('Should generate little clouds given 0.1', function () {
    //given
    var element = $compile('<i weather-icon clouds="0.1"></i>')($rootScope);
    //when
    $rootScope.$digest();
    //then
    expect(element.attr("class")).toContain("wi wi-fc wi-day-sunny-overcast");
  });

  it('Should generate not that small ammount of clouds given 0.65 at night', function () {
    //given
    var element = $compile('<i weather-icon clouds="0.65" night="true"></i>')($rootScope);
    //when
    $rootScope.$digest();
    //then
    expect(element.attr("class")).toContain("wi wi-fc wi-night-alt-cloudy-high");
  });
});