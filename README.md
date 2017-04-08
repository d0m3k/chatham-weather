# `chatham-weather` — forecast of the future

This project is using Chatham weather API (as defined [here][api]) to provide its users with current data on weather in locations of their choice.

## Feature list

Features include:
* Ability to filter cities with provided predictions;
* Adding cities to your favourites list for further faster reference (and cool dashboard look);
* Setting and managing the default location, loaded on application startup;
* Having configurable whether user prefers °C or °F, 12/24h time and their forecast provider: Forecast.io or World Weather.

## Technicalities

Project uses Angular in version `1.5.11`, as provided by `bower` bootstrapped from [seed app][seed]. [Bootstrap][bootstrap] is used for convenient responsiveness magic. [Font Awesome][fa] provides some UI icons, and [Weather Icons][weather-icons] are used for enhancing forecasts with nice weathery iconography.

User preferences are being held in local storage of their browser.

## Getting to work

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

[api]: https://github.com/Chatham/fe-test-task
[seed]: https://github.com/angular/angular-seed
[angularjs]: https://angularjs.org/
[bootstrap]: https://getbootstrap.com/
[fa]: http://fontawesome.io/
[weather-icons]: https://erikflowers.github.io/weather-icons/
[localhost]: http://localhost:8000/