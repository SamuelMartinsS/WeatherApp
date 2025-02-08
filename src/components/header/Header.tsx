import React from "react"
import WeatherRequest from "../../requests/WeatherRequest.tsx";
import { useState } from "react";
import { useRef } from "react";

export default function Header() {

    const [city, setCity] = useState("")
    const inputLocation = useRef(null);


    const handleLocation = () => {
        if (inputLocation.current) {
            setCity(inputLocation.current.value)
            WeatherRequest(city)
        }

    }

    return (

        <header>
            <div className="header">
                <div className="title">
                    <h2 className="header-h2">
                        Weather App
                    </h2>
                </div>
                <div className="search">
                    <label>Location</label>
                    <input  className="input-search" type="text" id="inpLocation" ref={inputLocation} placeholder="write the name of the location"></input>
                    <button classame="input-button" type="button" id="btnLocation" onClick={handleLocation}>Search</button>
                </div>
            </div>
        </header>

    )

};