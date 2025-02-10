import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import WeatherCard from "./WeatherCard.tsx";
import LineChart from "./LineChart.tsx";
import Header from "../header/Header.tsx";

export default function Panel() {
  const [weatherData, setWeatherData] = useState({ names: [], daily: {} });
  const [loading, setLoading] = useState(true);
  const [fahr, setfahr] = useState(false);


  const handleChildData = (data) => {
    setfahr(data);
  };



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

  return (
    <>
      <Header sendFahr={handleChildData} cityName={weatherData?.city || ""} />
      <div className="main-panel">
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
                    fahr={fahr}
                  />
                  <WeatherCard
                    day={weatherData.names[1]}
                    maxTemp={weatherData.weekly.day2.maxTemp}
                    minTemp={weatherData.weekly.day2.minTemp}
                    icon={weatherData.weekly.day2.icon}
                    fahr={fahr}
                  />
                  <WeatherCard
                    day={weatherData.names[2]}
                    maxTemp={weatherData.weekly.day3.maxTemp}
                    minTemp={weatherData.weekly.day3.minTemp}
                    icon={weatherData.weekly.day3.icon}
                    fahr={fahr}
                  />
                  <WeatherCard
                    day={weatherData.names[3]}
                    maxTemp={weatherData.weekly.day4.maxTemp}
                    minTemp={weatherData.weekly.day4.minTemp}
                    icon={weatherData.weekly.day4.icon}
                    fahr={fahr}
                  />
                  <WeatherCard
                    day={weatherData.names[4]}
                    maxTemp={weatherData.weekly.day5.maxTemp}
                    minTemp={weatherData.weekly.day5.minTemp}
                    icon={weatherData.weekly.day5.icon}
                    fahr={fahr}
                  />
                  {weatherData.weekly > 5 ? <WeatherCard
                    day={weatherData.names[5]}
                    maxTemp={weatherData.weekly.day6.maxTemp}
                    minTemp={weatherData.weekly.day6.minTemp}
                    icon={weatherData.weekly.day6.icon}
                    fahr={fahr}
                  /> : <> </>}


                </div>
              )}
            </>
          ) : (
            <>
              <div className="loading-container">
                <div className="loading-card">
                  <h3>TIP</h3>
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
        {weatherData.names.length > 0 && weatherData.daily && (
          <LineChart
            ids={weatherData.names}
            data={weatherData.daily}
            fahr={fahr}
          />
        )}
      </div>
    </>
  );
}
