import React from "react";
import WeatherRequest from "../../requests/WeatherRequest.tsx";
import { useState } from "react";
import { useRef } from "react";

export default function Header({ sendFahr, cityName }) {
  const inputLocation = useRef(null);
  const city = cityName;
  const [far, setFar] = useState(true);

  const handleLocation = async () => {
    if (inputLocation.current) {
      const control = await WeatherRequest(inputLocation.current.value);
      control === true ? alert("City "+inputLocation.current.value+" found!") : alert("City not found");
    }
  };

  const handleFar = () => {
    setFar(!far);
    sendFahr(far);
  };

  return (
    <header>
      <div className="header">
        {city !== undefined ? (
          <div className="city-name">{city.toUpperCase()} FORECAST</div>
        ) : (
          <div className="city-name">Forecast</div>
        )}
        <div className="search">
          <div className="switch-container">
            C°&nbsp;
            <label className="switch">
              <input type="checkbox" onClick={handleFar} />
              <span className="slider round"></span>
            </label>
            &nbsp;F°
          </div>
          <input
            className="input-search"
            type="text"
            id="inpLocation"
            ref={inputLocation}
            placeholder="city name goes in here"
            required
          ></input>
          <button
            className="input-button"
            type="button"
            id="btnLocation"
            onClick={handleLocation}
          >
            Go
          </button>
        </div>
      </div>
    </header>
  );
}
