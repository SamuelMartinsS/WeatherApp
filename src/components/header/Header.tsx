import React from "react";
import WeatherRequest from "../../requests/WeatherRequest.tsx";
import { useState } from "react";
import { useRef } from "react";

export default function Header() {
  const inputLocation = useRef(null);

  const handleLocation = () => {
    if (inputLocation.current) {
      WeatherRequest(inputLocation.current.value);
    }
  };

  return (
    <header>
      <div className="header">
        <div className="title">
          <h2 className="header-h2">Five Days Weather Forecast</h2>
        </div>
        <div className="search">
          <input
            className="input-search"
            type="text"
            id="inpLocation"
            ref={inputLocation}
            placeholder="city name goes in here"
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
