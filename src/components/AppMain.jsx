import { IoSearchOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import useWeather from './useWeather';
import citiesArray from './raw_cities';


const AppMain = () => {
    const [city, setCity] = useState('lucknow');
    const { data, loading, error } = useWeather(city);
    return (
        <div className="main-div">

            <SelectArea city={city} setCity={setCity} />
            <ViewInfo city={city} data={data} loading={loading} error={error} />
        </div>
    );
};

const SelectArea = (props) => {
    const [cityInput, setCityInput] = useState(props.city);
    const cityList = citiesArray;

    const handleSearch = () => {
        if (cityList.includes(cityInput)) {
            props.setCity(cityInput);
        } else {
            alert("City not found \n please write the name of a valid Indian city");
        }
    }

    return (
        <div className="select-area">
            <input
                list="city"
                id="city-input"
                name="city"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value.toLowerCase())}
            />

            <datalist id="city">
                {cityList.map((city, index) => (
                    <option value={city} key={index} />
                ))}
            </datalist>

            <button

                className="search-button"
                onClick={handleSearch}
            ><IoSearchOutline /></button>

        </div>
    );
}

const ViewInfo = ({ city, data, loading, error }) => {
    if (loading) {
        return <p>Loading...</p>;
    } else if (error) {
        return <p>Error: {error.message} <br /> API limit reached : try again next day</p>;
    } else if (!data || !data.data || data.data.length === 0) {
        return <p>No data available</p>;
    } else {
        const weather = data.data[0]; // Extract the first (and only) item in the data array
        const instdatetime = convertToIST(weather.ob_time);
        return (
            <div className="view-info">
                <p id="city-name">{city}</p>

                <div className="date-time">
                    <p>{instdatetime}</p> {/* You can format this as needed */}
                </div>

                <div className="weather-info">
                    <div className="weather-type">
                        <img src={`https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`} alt="weather-img" />
                    </div>
                    <div className="weather-temp">
                        <div className="temperature">
                            <p id="temp">{weather.temp}°C</p>
                        </div>
                    </div>
                </div>
                <p>{weather.weather.description}</p>

                <div className="weather-data">
                    <p>Wind Speed: <span>{weather.wind_spd} km/h</span></p> {/* Wind Speed */}
                    <p>Humidity: <span>{weather.rh}%</span></p> {/* Humidity */}
                    <p>Precipitation: <span>{weather.precip} mm</span></p> {/* Precipitation */}
                </div>
            </div>
        );
    }
};

const convertToIST = (utcDateString) => {
    const date = new Date(utcDateString);
    // IST is UTC + 5:30
    const offset = 5 * 60 + 30; // 5 hours 30 minutes in minutes
    const istDate = new Date(date.getTime() + offset * 60 * 1000);
    return istDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
};




export default AppMain;