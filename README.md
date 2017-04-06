# `chatham-weather` — forecast of the future

This project is using Chatham weather API to provide its users with current data about weather in cities of their choice.

## Feature list

Predicted features include:
* Ability to filter cities with provided predictions;
* Adding up to five cities to your favourites list for further faster reference (and cool dashboard look);
* Seeing some cool data about selected cities, like photos from Google Places, if granted by our API;
* Having configurable whether user prefers °C or °F (duh), 12/24h time and whether and if they prefer Forecast.io or World Weather.

### Technicalities

Project uses Angular in version `1.5.11`, as provided by `bower` bootstrapped from [seed app][seed]. 
User preferences are being held in local storage of their browser.

More details in a near future.

### Clone `chatham-weather`

To get untouched sources of the project, call:

```
git clone https://github.com/d0m3k/chatham-weather.git
cd chatham-weather
```

### Install Dependencies and Run

Since the `seed app` configuration is being used, to fulfill dependencies and run app you should run:

```
npm install
npm start
```

Browse to the app at [`localhost:8000/`][localhost]. You should now see the future of forecasting.


[seed]: https://github.com/angular/angular-seed
[angularjs]: https://angularjs.org/
[localhost]: http://localhost:8000/