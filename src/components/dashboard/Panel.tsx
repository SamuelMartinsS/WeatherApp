import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import WeatherCard from "./WeatherCard.tsx";
import LineChart from "./LineChart.tsx";

export default function Panel() {
  const [weatherData, setWeatherData] = useState({ names: [], daily: {} });
  const [far, setFar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState(null);

  useEffect(() => {
    const readWeather = () => {
      try {
        const storedData = localStorage.getItem("weatherData");
        if (storedData != null) {
          const parsedData = JSON.parse(storedData);
          setWeatherData(parsedData);
          setLoading(false);
        } else {
          setLoading(true);
        }
      } catch (error) {
        throw error;
      }
    };

    const timer = setInterval(readWeather, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleFar = () => {
    setFar(!far);
  };

  return (
    <div className="main-panel">
      <div className="sub-panel">
        {weatherData.city !== undefined ? (
          <>
            <div className="city-name">{weatherData.city}</div>
            <div className="switch-container">
              C°
              <label className="switch">
                <input type="checkbox" onClick={handleFar} />
                <span className="slider round"></span>
              </label>
              F°
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div>
        {loading === false ? (
          <>
            {weatherData.names.length > 0 && weatherData.daily && (
              <div className="cards-container">
                <WeatherCard
                  day={weatherData.names[0]}
                  maxTemp={weatherData.weekly.day1.maxTemp}
                  minTemp={weatherData.weekly.day1.minTemp}
                  icon={weatherData.weekly.day1.icon}
                  far={far}
                />
                <WeatherCard
                  day={weatherData.names[1]}
                  maxTemp={weatherData.weekly.day2.maxTemp}
                  minTemp={weatherData.weekly.day2.minTemp}
                  icon={weatherData.weekly.day2.icon}
                  far={far}
                />
                <WeatherCard
                  day={weatherData.names[2]}
                  maxTemp={weatherData.weekly.day3.maxTemp}
                  minTemp={weatherData.weekly.day3.minTemp}
                  icon={weatherData.weekly.day3.icon}
                  far={far}
                />
                <WeatherCard
                  day={weatherData.names[3]}
                  maxTemp={weatherData.weekly.day4.maxTemp}
                  minTemp={weatherData.weekly.day4.minTemp}
                  icon={weatherData.weekly.day4.icon}
                  far={far}
                />
                <WeatherCard
                  day={weatherData.names[4]}
                  maxTemp={weatherData.weekly.day5.maxTemp}
                  minTemp={weatherData.weekly.day5.minTemp}
                  icon={weatherData.weekly.day5.icon}
                  far={far}
                />
                <WeatherCard
                  day={weatherData.names[5]}
                  maxTemp={weatherData.weekly.day6.maxTemp}
                  minTemp={weatherData.weekly.day6.minTemp}
                  icon={weatherData.weekly.day6.icon}
                  far={far}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <div className="loading-container">
              <div className="loading-card">
                <h3>Loading...</h3>
                <p>
                  Type in the name of the city for which you want to see the
                  weather forecast for the next 5 days in the text box in the
                  top right-hand corner
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="chart-container">
        {weatherData.names.length > 0 && weatherData.daily && (
          <LineChart
            ids={weatherData.names}
            data={weatherData.daily}
            celcius={true}
          />
        )}
      </div>
    </div>
  );
}
