//creation of each card
import React from "react";

export default function WeatherCard(props) {
  const WeatherIcon = ({ iconCode }) => {
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    return <img src={iconUrl} />;
  };

  const showTemperature = (temperature) => {
    if (props.fahr) return (temperature * 1.8 + 32).toFixed(2) + " F°";
    return temperature + " C°";
  };

  return (
    <div className="weather-card">
      <h3 className="card-title">{props.day}</h3>
      <div className="card-content">
        <p className="card-message">
          {" "}
          max &nbsp;&nbsp;{showTemperature(props.maxTemp)}
        </p>
        <p className="card-message">
          {" "}
          min &nbsp;&nbsp;{showTemperature(props.minTemp)}
        </p>
        <WeatherIcon iconCode={props.icon} />
      </div>
    </div>
  );
}
