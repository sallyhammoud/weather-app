# Weather App

A React-based weather application that allows users to search for cities and view current weather conditions and a five-day forecast.

## Features

* **City Search:** Search for cities using an autocomplete search field.
* **Current Weather:** View the current temperature and weather conditions for a selected city.
* **Five-Day Forecast:** View daily minimum and maximum temperatures.
* **Detailed Forecast:** Expand forecast entries to see additional weather information, including humidity, wind speed, cloud coverage, and atmospheric pressure.
* **Loading and Error Handling:** Display loading states and error messages when requests fail.
* **Responsive Search Experience:** Debounced city search to reduce unnecessary API requests.

## Technologies Used

* React
* JavaScript
* HTML and CSS
* OpenWeather API
* GeoDB Cities API through RapidAPI
* Fetch API
* npm

## Prerequisites

Before running the application, ensure you have installed:

* [Node.js](https://nodejs.org/)
* npm, which is included with Node.js

You will also need API credentials for OpenWeather and GeoDB Cities through RapidAPI.

## Getting Started

### 1. Clone the repository

git clone https://github.com/sallyhammoud/weather-app.git


### 2. Navigate to the project directory


cd weather-app


### 3. Install dependencies


npm ci


### 4. Configure environment variables

Create a `.env` file in the root directory of the project, alongside `package.json`.

Add your API credentials:

REACT_APP_GEO_API_KEY=your_geodb_rapidapi_key
REACT_APP_WEATHER_API_KEY=your_openweather_api_key


Replace the placeholder values with your own API keys.

You can use `.env.example` as a reference for the required variable names.

**Important:** Never commit your `.env` file or publish your API keys. The application uses these environment variables during development and when building the frontend. Because frontend environment variables are included in the browser bundle, they are not secret from users. For production applications requiring protected credentials, use a backend to handle API requests.

After creating or changing `.env`, restart the development server if it is already running.

### 5. Start the development server

bash
npm start


The application will open in your browser, usually at `http://localhost:3000`.

## Available Scripts

| Command                        | Description                            |
| ------------------------------ | -------------------------------------- |
| `npm start`                    | Starts the development server.         |
| `npm test -- --watchAll=false` | Runs the automated tests once.         |
| `npm run build`                | Creates an optimized production build. |

## APIs

### OpenWeather

Used to retrieve current weather conditions and forecast data.

Website: https://openweathermap.org/api

### GeoDB Cities

Used to retrieve city suggestions for the autocomplete search field.

The application accesses GeoDB Cities through RapidAPI.

Website: https://rapidapi.com/

## Project Structure

## Project Structure

weather-app/
  public/
    icons/
  src/
    components/
      current-weather/
      forecast/
      search/
    api.js
    App.js
    App.css
    App.test.js
    index.js
  .env.example
  .gitignore
  package.json
  package-lock.json



## Testing

Run the automated tests with:


npm test -- --watchAll=false


To verify that the application compiles for production, run:


npm run build


## License

No license has been specified for this project.
