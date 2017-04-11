'use strict';
describe('Local storage service tests', function () {
  var $service;

  var cities = [{
      "description": "Kraków, Poland",
      "place_id": "ChIJ0RhONcBEFkcRv4pHdrW2a7Q",
      "latitude": 50.06465009999999,
      "longitude": 19.9449799
    },
    {
      "description": "Sanok, Poland",
      "place_id": "ChIJYUmCtoFtPEcRbKzUSvcp6fI",
      "latitude": 49.5550187,
      "longitude": 22.20606579999999
    },
    {
      "description": "Warsaw, Poland",
      "place_id": "ChIJAZ-GmmbMHkcR_NPqiCq-8HI",
      "latitude": 52.2296756,
      "longitude": 21.0122287
    }
  ];

  function fillWithCities() {
    cities.map(function (city) {
      $service.addCity(city);
    });
  }

  beforeEach(function () {
    module('chathamWeather.localStorageService');
    inject(function ($injector) {
      $service = $injector.get('localStorageService');
    });
    window.localStorage.clear();
  });

  it('Should provide with city list', function () {
    // given cities
    // when
    fillWithCities();
    var currentCities = $service.getCityList();

    //then
    cities.map(function (city) {
      expect(city).toEqual(currentCities[city.place_id])
    })
  });

  it('Should add first city as default too', function () {
    // given cities
    // when
    fillWithCities();

    // then
    expect($service.getDefaultId()).toEqual('ChIJ0RhONcBEFkcRv4pHdrW2a7Q');
    expect($service.getCityDetails($service.getDefaultId())).toEqual({
      "description": "Kraków, Poland",
      "place_id": "ChIJ0RhONcBEFkcRv4pHdrW2a7Q",
      "latitude": 50.06465009999999,
      "longitude": 19.9449799
    });
  });

  it('Should change default', function () {
    // given cities
    // when
    fillWithCities();
    $service.setDefaultId("ChIJYUmCtoFtPEcRbKzUSvcp6fI");

    // then
    expect($service.getDefaultId()).toEqual('ChIJYUmCtoFtPEcRbKzUSvcp6fI');
    expect($service.getCityDetails($service.getDefaultId())).toEqual({
      "description": "Sanok, Poland",
      "place_id": "ChIJYUmCtoFtPEcRbKzUSvcp6fI",
      "latitude": 49.5550187,
      "longitude": 22.20606579999999
    });
  });

  it('Should handle removing cities with at least one left', function () {
    // given cities
    // when
    fillWithCities();
    $service.removeCity("ChIJYUmCtoFtPEcRbKzUSvcp6fI");

    // then
    expect($service.getDefaultId()).toEqual('ChIJ0RhONcBEFkcRv4pHdrW2a7Q');
    expect($service.getCityDetails("ChIJYUmCtoFtPEcRbKzUSvcp6fI")).toBeUndefined();
  });

  it('Should throw when removing without cities', function () {
    expect(function () {
      $service.removeCity("ChIJYUmCtoFtPEcRbKzUSvcp6fI")
    }).toThrow();
  });

  it('Should set the second one to default when current default deleted', function () {
    // given cities
    // when
    fillWithCities();
    $service.removeCity("ChIJ0RhONcBEFkcRv4pHdrW2a7Q");
    expect($service.getDefaultId()).toEqual('ChIJYUmCtoFtPEcRbKzUSvcp6fI');
  });

  it('Should get false (F) as default temperature setting', function () {
    // given clear local storage
    // then
    expect($service.getIsCelsius()).toEqual(false);
  });

  it('Should get temperature settings', function () {
    // given clear local storage
    // when
    $service.setIsCelsius(true);
    // then
    expect($service.getIsCelsius()).toEqual(true);
  });

  it('Should get FORECAST_IO as default provider', function () {
    // given clear local storage
    // then
    expect($service.getProvider()).toEqual("FORECAST_IO");
  });

  it('Should get forecast provider', function () {
    // given clear local storage
    // when
    $service.setProvider("WORLD_WEATHER");
    // then
    expect($service.getProvider()).toEqual("WORLD_WEATHER");
  })
});