import React, {useEffect, useRef} from "react";
import AirIcon from '@mui/icons-material/Air';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import { TimestampToTimeString } from "../utils/TimestampConverter";
import DetailsData from "./DetailsData";

interface DisplayDataProps {
    weather_object: any;
}

const DisplayData: React.FC<DisplayDataProps> = ({ weather_object }) => {
    const getCurrentHourIndex = () => {
        const currentHour = new Date().getHours();
        let index = 0;
        if (weather_object.hourly) {
            for (let i = 0; i < weather_object.hourly.time.length; i++) {
                const date = new Date(weather_object.hourly.time[i] * 1000);
                const hour = date.getHours();
                if (hour === currentHour) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }

    return (
        <div className={`displayData__container`}>
            {weather_object.current_weather && weather_object.daily && (
            <div className="displayData__container-content" style={weather_object.current_weather.is_day ? {background: "linear-gradient(to bottom, #90dffe 0%,#38a3d1 100%)", color: "#020033"} : {background: "linear-gradient(to top, #283E51, #0A2342)", color: "#cbe2f5"}}>
                <div className="displayData__container--stars"></div>
                <div className="displayData__container--currentWeather">
                    <div className="displayData__container--currentWeather-main">
                        <p className="displayData__container--currentWeather-date">{
                            (new Date()).toLocaleString('en-US', { month: 'long' }) + " " + (new Date()).getDate() + " " + (new Date()).toLocaleString('en-US', { weekday: 'long' })
                        }</p>
                        <p className="displayData__container--currentWeather-temperature">Temperature {<DeviceThermostatIcon/>}: {weather_object.current_weather.temperature} °C</p>
                        <p className="displayData__container--currentWeather-wind">{
                            <AirIcon style={{transform: `rotate(${weather_object.current_weather.winddirection + 90}deg)`, marginRight: "15px"}}/>
                        }Wind: {weather_object.current_weather.windspeed} km/h</p>
                        <p className="displayData__container--currentWeather-sunrise"><WbSunnyIcon/> {
                            (new Date(weather_object.daily.sunrise[0] * 1000)).toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit' })
                        }
                        </p>
                        <p className="displayData__container--currentWeather-sunset"><WbTwilightIcon/> {
                            (new Date(weather_object.daily.sunset[0] * 1000)).toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit' })
                        }</p>
                    </div>
                    <div className="displayData__container--currentWeather-wrap">
                        <div className="displayData__container--currentWeatherData time">
                            {
                                weather_object.hourly.time.filter((item: number, index: number) => index > 72 + getCurrentHourIndex() - 3 && index <= 96 + getCurrentHourIndex() - 3).map((item: number, j: number) => {
                                    if (j === 2) {
                                        return (
                                            <div className="displayData__container--currentWeatherData-selectItem top" key={j}>
                                                <p>Now</p>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div className="displayData__container--currentWeatherData-item" key={j}>
                                            <TimestampToTimeString timestamp={item} />
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <label className="displayData__container--label temperature">Temperature</label>
                        <div className="displayData__container--currentWeatherData temperature">{
                            weather_object.hourly.temperature_2m.filter((item: number, index: number) => index > 72 + getCurrentHourIndex() - 3 && index <= 96 + getCurrentHourIndex() -3).map((item: number, j: number) => {
                                if (j === 2) {
                                    return (
                                        <div className="displayData__container--currentWeatherData-selectItem" key={j}>
                                            <p>{item}°C</p>
                                        </div>
                                    );
                                }
                                return (
                                    <div className="displayData__container--currentWeatherData-item" key={j}>
                                        <p>{item}°C</p>
                                    </div>
                                );
                            })
                        }
                        </div>
                        <label className="displayData__container--label apparent_temperature">Feels like</label>
                        <div className="displayData__container--currentWeatherData apparTemperature">
                            {
                                weather_object.hourly.apparent_temperature.filter((item: number, index: number) => index > 72 + getCurrentHourIndex() - 4 && index <= 96 + getCurrentHourIndex()-4).map((item: number, j: number) => {
                                    if (j === 2) {
                                        return (
                                            <div className="displayData__container--currentWeatherData-selectItem" key={j}>
                                                <p>{item}°C</p>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div className="displayData__container--currentWeatherData-item" key={j}>
                                            <p>{item}°C</p>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <label className="displayData__container--label precipitation_probability">Precipitation probability</label>
                        <div className="displayData__container--currentWeatherData precProbability">
                            {
                                weather_object.hourly.precipitation_probability.filter((item: number, index: number) => index > 72 + getCurrentHourIndex() - 3 && index <= 96 + getCurrentHourIndex()-3).map((item: number, j: number) => {
                                    if (j === 2) {
                                        return (
                                            <div className="displayData__container--currentWeatherData-selectItem" key={j}>
                                                <p>{item}%</p>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div className="displayData__container--currentWeatherData-item" key={j}>
                                            <p>{item}%</p>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <label className="displayData__container--label relativehumidity">Relative humidity</label>
                        <div className="displayData__container--currentWeatherData relativehumidity">
                            {
                                weather_object.hourly.relativehumidity_2m.filter((item: number, index: number) => index > 72 + getCurrentHourIndex() - 3 && index <= 96 + getCurrentHourIndex()-3).map((item: number, j: number) => {
                                    if (j === 2) {
                                        return (
                                            <div className="displayData__container--currentWeatherData-selectItem bottom" key={j}>
                                                <p>{item}%</p>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div className="displayData__container--currentWeatherData-item" key={j}>
                                            <p>{item}%</p>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="displayData__container--dailyWeather">
                    <label className="displayData__container--dailyWeather-weekly">Weekly forecast</label>
                    <div className="displayData__container--dailyWeather-wrap">
                        <DetailsData weather_object={weather_object} />
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}

export default DisplayData;