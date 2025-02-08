//creation of each card
import React from "react";

export default function WeatherCard(props) {
  const WeatherIcon = ({ iconCode }) => {
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    return <img src={iconUrl} />;
  };

  const showTemperature = (temperature) => {
    if (props.far) return temperature * 1.8 + 32 + " F°";
    return temperature + " C°";
  };

  return (
    <div style={{ width: "15rem" }} className="weather-card">
      <h3 className="card-title">{props.day}</h3>
      <div>
        <p>max &nbsp;&nbsp;{showTemperature(props.maxTemp)}</p>
        <p>min &nbsp;&nbsp;{showTemperature(props.minTemp)}</p>
        <WeatherIcon iconCode={props.icon} />
      </div>
    </div>
  );
}
