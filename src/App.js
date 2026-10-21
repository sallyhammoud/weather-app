import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import Forecast from './components/forecast/forecast';
import { useState, useRef } from 'react';

function App() {
const [currentWeather, setCurrentWeather] = useState(null);
const [forecast, setForecast] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const abortControllerRef = useRef(null);

const handleSearchChange = async (searchData) => {
const [lat, lon] = searchData.value.split(' ');

if (abortControllerRef.current) {
  abortControllerRef.current.abort();
}

const controller = new AbortController();
abortControllerRef.current = controller;


setLoading(true);
setError('');

try {
  const currentWeatherUrl = new URL(`${WEATHER_API_URL}/weather`);
  currentWeatherUrl.search = new URLSearchParams({
    lat,
    lon,
    appid: WEATHER_API_KEY,
    units: 'metric',
  });

  const forecastUrl = new URL(`${WEATHER_API_URL}/forecast`);
  forecastUrl.search = new URLSearchParams({
    lat,
    lon,
    appid: WEATHER_API_KEY,
    units: 'metric',
  });

  const [currentResponse, forecastResponse] = await Promise.all([
  fetch(currentWeatherUrl, { signal: controller.signal }),
  fetch(forecastUrl, { signal: controller.signal }),
]);

  if (!currentResponse.ok || !forecastResponse.ok) {
    throw new Error('Weather data could not be loaded. Please try again.');
  }

  const weatherData = await currentResponse.json();
  const forecastData = await forecastResponse.json();

  setCurrentWeather({
    city: searchData.label,
    ...weatherData,
  });

  setForecast({
    city: searchData.label,
    ...forecastData,
  });
    } catch (err) {
      if (err.name === 'AbortError') {
        return;
      }

      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
    if (abortControllerRef.current === controller) {
        setLoading(false);
    }
}


};

return ( <div className="container"> <Search onSearchChange={handleSearchChange} />


  {loading && <p>Loading weather...</p>}
  {error && <p role="alert">{error}</p>}

  {currentWeather && !loading && (
    <CurrentWeather data={currentWeather} />
  )}

  {forecast && !loading && <Forecast data={forecast} />}
</div>


);
}

export default App;
