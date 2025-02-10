import React from "react";
import WeatherRequest from "../../requests/WeatherRequest.tsx";
import { useState } from "react";
import { useRef } from "react";
import Modal from "../dashboard/Modal.tsx";

export default function Header({ sendFahr, cityName }) {
  const inputLocation = useRef(null);
  const city = cityName;
  const [far, setFar] = useState(true);
  const [showModalError, setShowModalError] = useState(false);
  const [showModalLoading, setShowModalLoading] = useState(false);

  const handleLocation = async () => {
    if (inputLocation.current) {
      const control = await WeatherRequest(inputLocation.current.value);
      control === true ? setShowModalLoading(true) : setShowModalError(true);
    }
  };

  const handleCloseModal = () => {
    setShowModalLoading(false);
    setShowModalError(false);
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
            placeholder="city name"
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
      {showModalError && (
        <Modal
          isOpen={showModalError}
          onClose={handleCloseModal}
          error={true}
        />
      )}
      {showModalLoading && (
        <Modal
          isOpen={showModalLoading}
          onClose={handleCloseModal}
          error={false}
        />
      )}
    </header>
  );
}
