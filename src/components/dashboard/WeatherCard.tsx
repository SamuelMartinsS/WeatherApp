//creation of each card
import React from "react"

export default function WeatherCard(props) {



    return(
        <div style={{width: "15rem"}} className="weather-card">
            <h6>{props.day}</h6>
            <div>
                <p>
                    Max Temp: {props.maxTemp}
                </p>
                <p>
                    Min Temp: {props.minTemp}
                </p>
            </div>
        </div>

    )

}