describe('unit testing weatherIcon generating directive', function () {
  var $compile,
    $rootScope;

  beforeEach(module('chathamWeather.formatDate'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Should transform 2017-02-15 to Wednesday', function () {
    //given
    var element = $compile('<h1 f-date date="2017-02-15" format="day"></h1>')($rootScope);
    //when
    $rootScope.$digest();
    //then
    expect(element.text()).toContain("Wednesday");
  });

  it('Should transform 2016-02-29 to Monday', function () {
    //given
    var element = $compile('<h1 f-date date="2016-02-29" format="day"></h1>')($rootScope);
    //when
    $rootScope.$digest();
    //then
    expect(element.text()).toContain("Monday");
  });
  
});