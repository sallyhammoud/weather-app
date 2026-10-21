import { useMemo } from "react";
import "./forecast.css";

const Forecast = ({ data }) => {

  const dailyForecast = useMemo(() => {
if (!data?.list) return [];

const days = {};

data.list.forEach((item) => {
  const date = item.dt_txt.split(" ")[0];

  if (!days[date]) {
    days[date] = [];
  }

  days[date].push(item);
});

return Object.entries(days)
  .slice(0, 5)
  .map(([date, items]) => {
    const representative =
      items.find((item) => item.dt_txt.includes("12:00:00")) ||
      items[Math.floor(items.length / 2)];

    return {
      date,
      min: Math.min(...items.map((item) => item.main.temp_min)),
      max: Math.max(...items.map((item) => item.main.temp_max)),
      representative,
    };
  });


}, [data]);

if (!data?.list) return null;

return (
<> <h2 className="title">5-Day Forecast</h2>


  <div className="forecast-list">
    {dailyForecast.map((day) => {
      const item = day.representative;

      return (
        <details className="forecast-day" key={day.date}>
          <summary className="daily-item">
            <img
              alt={item.weather[0].description}
              className="icon-small"
              src={`${process.env.PUBLIC_URL}/icons/${item.weather[0].icon}.png`}
            />

            <span className="day">
              {new Date(`${day.date}T12:00:00`).toLocaleDateString(
                "en-US",
                { weekday: "long" }
              )}
            </span>

            <span className="description">
              {item.weather[0].description}
            </span>

            <span className="min-max">
              {Math.round(day.min)}°C / {Math.round(day.max)}°C
            </span>
          </summary>

          <div className="daily-details-grid">
            <div className="daily-details-grid-item">
              <span>Pressure</span>
              <span>{item.main.pressure} hPa</span>
            </div>

            <div className="daily-details-grid-item">
              <span>Humidity</span>
              <span>{item.main.humidity}%</span>
            </div>

            <div className="daily-details-grid-item">
              <span>Clouds</span>
              <span>{item.clouds.all}%</span>
            </div>

            <div className="daily-details-grid-item">
              <span>Wind Speed</span>
              <span>{item.wind.speed} m/s</span>
            </div>

            {item.main.sea_level != null && (
              <div className="daily-details-grid-item">
                <span>Sea Level Pressure</span>
                <span>{item.main.sea_level} hPa</span>
              </div>
            )}

            <div className="daily-details-grid-item">
              <span>Feels like</span>
              <span>{Math.round(item.main.feels_like)}°C</span>
            </div>
          </div>
        </details>
      );
    })}
  </div>
</>

);
};

export default Forecast;
