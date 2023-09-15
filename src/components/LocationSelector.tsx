import React, {useEffect, useState} from "react";
import Select from "react-select";
import axios from "axios";
import { useDispatch, useSelector} from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setCity, setCountry } from "../redux/location";
import DisplayData from "./DisplayData";
import {Button} from "@mui/material";

const LocationSelector: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [countries, setCountries] = React.useState<any[]>([]);
    const [cities, setCities] = React.useState<any[]>([]);
    const selectedCountry = useSelector((state: RootState) => state.location.country);
    const selectedCity = useSelector((state: RootState) => state.location.city);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [weatherDetails, setWeatherDetails] = useState<any[]>([]);

    const [previousCountry, setPreviousCountry] = useState<string | null>(null);

    useEffect(() => {
        axios.get("https://countriesnow.space/api/v0.1/countries")
        .then((response) => {
            setCountries(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        if (selectedCountry && selectedCountry !== previousCountry) {
            if (countries.find((country) => country.country === selectedCountry)) {
                setCities(() => {
                    return countries.find((country) => country.country === selectedCountry)?.cities || [];
                });
            }
            setPreviousCountry(selectedCountry);
        }
    }, [selectedCountry, previousCountry, countries]);

    const countryOptions = countries.map((country) => {
        return { value: country.country, label: country.country };
    });

    const cityOptions = cities.map((city) => {
        return { value: city, label: city };
    });

    const handleCountryChange = (selectedOption: any) => {
        dispatch(setCountry(selectedOption.value));
        dispatch(setCity(""));
        setLatitude(null);
        setLongitude(null);
    }

    const handleCityChange = (selectedOption: any) => {
        dispatch(setCity(selectedOption.value));
        axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${selectedOption.value}`)
            .then((response) => {
                setLatitude(response.data.results[0].latitude);
                setLongitude(response.data.results[0].longitude);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleLocationChange = (selectedOption: any) => {
        axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,is_day&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&current_weather=true&timeformat=unixtime&timezone=Europe%2FMoscow&past_days=3`)
            .then((response) => {
                setWeatherDetails(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <div className="selectLocation__container">
            <div className="selectLocation__container-wrap">
                <div className="country__container">
                    <label>Country</label>
                    <Select
                        options={countryOptions}
                        value={countries.find((country) => country.value === selectedCountry)}
                        onChange={handleCountryChange}
                     />
                </div>
                <div className="city__container">
                    <label>City</label>
                    <Select
                        options={cityOptions}
                        onChange={handleCityChange}
                        value={cities.find((city) => city.value === selectedCity)}
                        isDisabled={!selectedCountry}
                    />
                </div>
                <Button onClick={handleLocationChange} variant="contained">Get data</Button>
            </div>
            <div className="setLocation--displayData__container">
                <DisplayData weather_object={weatherDetails} />
            </div>
        </div>
    );
}

export default LocationSelector;