import React from "react";
import {TimestampToDateString} from "../utils/TimestampConverter";

interface DetailsDataProps {
    weather_object: {
        daily: {
            time: string[];
            precipitation_probability_max: number[];
            sunrise: number[];
            sunset: number[];
            temperature_2m_max: number[];
            temperature_2m_min: number[];
            precipitation_probability: number[];
        };
        hourly: {
            precipitation_probability: number[];
            temperature_2m: number[];
            apparent_temperature: number[];
            relativehumidity_2m: number[];
            time: number[];
        }
    };
}

const DetailsData: React.FC<DetailsDataProps> = ({ weather_object }) => {
    if (weather_object.daily.time.length > 0) {
        return (
            <div className="displayData__container--dailyWeather-item-wrap">
                <div className="displayData__container--dailyWeather-item time">{
                    weather_object.daily.time.map((time, i) => (
                        <div className="displayData__container--dailyWeather-item--time" key={i}>
                            {<TimestampToDateString timestamp={Number(time)} />}
                        </div>
                    ))
                }</div>
                <label className="displayData__container--dailyWeather-label daytimeTemp">Daytime Temperature</label>
                <div className="displayData__container--dailyWeather-item maxTemp">{
                    weather_object.daily.temperature_2m_max.map((temperature, i) => (
                        <p className="displayData__container--dailyWeather-item-p" key={i}>{temperature}°C</p>
                    ))
                }</div>
                <label className="displayData__container--dailyWeather-label nightTemp">Night Temperature</label>
                <div className="displayData__container--dailyWeather-item minTemp">{
                    weather_object.daily.temperature_2m_min.map((temperature, i) => (
                        <p className="displayData__container--dailyWeather-item-p" key={i}>{temperature}°C</p>
                    ))
                }</div>
                <label className="displayData__container--dailyWeather-label precProbability">Probability of Precipitation</label>
                <div className="displayData__container--dailyWeather-item precipitation">{
                    weather_object.daily.precipitation_probability_max.map((precipitation, i) => (
                        <p className="displayData__container--dailyWeather-item-p" key={i}>{precipitation}%</p>
                    ))
                }</div>
            </div>
        );
    }

    return (
        <></>
    )
};

export default DetailsData;