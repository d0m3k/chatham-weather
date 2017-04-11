# `chatham-weather` — forecast of the future

This project is using Chatham weather API (as defined [here][api]) to provide its users with current data on weather in locations of their choice. Works well on current versions of desktop Google Chrome, Safari and Mozilla Firefox, as well as mobile Chrome on Android. [See live demo][demo]

## Feature list

Features include:
* Ability to filter cities with provided predictions;
* Adding cities to your favourites list for further faster reference;
* Setting and managing the home location, which is loaded on root (`/`) of the application and conveniently provided on the app bar with current temperature and cloud cover information;
* Autorefreshing of forecasts each minute, to be as up-to-date as possible;
* Having configurable whether user prefers °C or °F, 12/24h time and their forecast provider: Forecast.io or World Weather;
* Responsive design, adapting to mobile screens.

## Technicalities

Project uses Angular in version `1.5.11`, as provided by `bower` bootstrapped from [seed app][seed]. [Bootstrap][bootstrap] is used for convenient responsiveness magic. [Font Awesome][fa] provides some UI icons, and [Weather Icons][weather-icons] are used for enhancing forecasts with nice weathery iconography.

User preferences and favourites are being held in local storage of their browser. Downloaded data is being cached; in case of forecast data, [angular-cache] is used to invalidate cached data after 30 seconds. Application autorefreshes forecast data each minute.

## Running locally

### Clone `chatham-weather`

To get untouched sources of the project, call:

```
git clone https://github.com/d0m3k/chatham-weather.git
cd chatham-weather
```

### Install Dependencies and Run

Since the `seed app` configuration is being used, all it takes to fulfill dependencies and run app is:

```
npm start
```
This will call `npm install` and `bower install`, which should take care of missing stuff, and then run a small `http-server` hosting the application.

Browse to the app at [`http://localhost:8000/`][localhost]. You should now see *the future of forecasting*.

### Running tests

Just to be sure about functionalities of `chatham-weather`, you can run Jasmine test in Karma runner (just as in [seed app][seed]) by running:

```
npm test
```
Karma will then start watching over any code changes, providing with tests results in console.

[demo]: http://dom3k.pl/chatham-weather/
[api]: https://github.com/Chatham/fe-test-task
[seed]: https://github.com/angular/angular-seed
[angular-cache]: https://github.com/jmdobry/angular-cache
[bootstrap]: https://getbootstrap.com/
[fa]: http://fontawesome.io/
[weather-icons]: https://erikflowers.github.io/weather-icons/
[localhost]: http://localhost:8000/

## Bugs and fixes

Not found! But in case API couldn't respond again, just add `/static` at the end of `this.apiAddr` definition on top of `apiService.js`, which can be found in `app/services`. This will fall back to dummy static resources, saved for testing purposes. Cleaning browser cache may be necessary.

Using private mode in Safari causes local storage quota to be roughly around `0`, so using favourites will fail, and temperature/provider preferences will be preserved during current session only.