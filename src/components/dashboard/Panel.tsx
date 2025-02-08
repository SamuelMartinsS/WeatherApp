import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import WeatherCard from "./WeatherCard.tsx";
import LineChart from "./LineChart.tsx";

export default function Panel() {

    const [weatherData, setWeatherData] = useState({ names: [], daily: {} });
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const storedData = localStorage.getItem("weatherData")

        if (storedData) {
            const parsedData = JSON.parse(storedData)
            setWeatherData(parsedData)
            console.log(weatherData)
        }
    }, [])

    return (
        <div classname="main-panel">
            <div className="switch-container">
            C°
                <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                    
                </label>
                F°
            </div>
            <div>
                {weatherData.names.length > 0 && weatherData.daily && (
                    <div className="cards-container">
                        <WeatherCard day={weatherData.names[0]} maxTemp={weatherData.weekly.day1.maxTemp} minTemp={weatherData.weekly.day1.minTemp} />
                        <WeatherCard day={weatherData.names[1]} maxTemp={weatherData.weekly.day2.maxTemp} minTemp={weatherData.weekly.day2.minTemp} />
                        <WeatherCard day={weatherData.names[2]} maxTemp={weatherData.weekly.day3.maxTemp} minTemp={weatherData.weekly.day3.minTemp} />
                        <WeatherCard day={weatherData.names[3]} maxTemp={weatherData.weekly.day4.maxTemp} minTemp={weatherData.weekly.day4.minTemp} />
                        <WeatherCard day={weatherData.names[4]} maxTemp={weatherData.weekly.day5.maxTemp} minTemp={weatherData.weekly.day5.minTemp} />
                        <WeatherCard day={weatherData.names[5]} maxTemp={weatherData.weekly.day6.maxTemp} minTemp={weatherData.weekly.day6.minTemp} />

                    </div>
                )}

            </div>
            <div className="chart-container">
                {weatherData.names.length > 0 && weatherData.daily && (
                    <LineChart ids={weatherData.names} data={weatherData.daily} celcius={true} />
                )}
            </div>

        </div>
    )
}