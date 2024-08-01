import { IoSearchOutline } from "react-icons/io5";
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

const SelectArea = ({ city, setCity }) => {
    const [cityInput, setCityInput] = useState(city);
    const cityList = citiesArray;

    const handleSearch = () => {
        if (cityInput && cityList.includes(cityInput.toLowerCase())) {
            setCity(cityInput.toLowerCase());
        } else {
            // Using a simple error message instead of alert
            alert("City not found. Please enter a valid Indian city.");
        }
    };

    return (
        <div className="select-area">
            <input
                list="city"
                id="city-input"
                name="city"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
            />
            <datalist id="city">
                {cityList.map((city, index) => (
                    <option value={city} key={index} />
                ))}
            </datalist>
            <button
                className="search-button"
                onClick={handleSearch}
            >
                <IoSearchOutline />
            </button>
            <p id="error-message" className="error-message"></p>
        </div>
    );
};

const ViewInfo = ({ city, data, loading, error }) => {
    const WeatherDataView = ({ weather, istdatetime, error }) => (
        <div className="view-info">
            {error ? <p className="api-error">Error: API limit reached or an issue occurred. Please try again later. <br /> old data shown below</p> : null}
            <p id="city-name">{city}</p>
            <div className="date-time">
                <p>{istdatetime}</p>
            </div>
            <div className="weather-info">
                <div className="weather-type">
                    <img src={`https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`} alt="weather icon" />
                </div>
                <div className="weather-temp">
                    <p id="temp">{weather.temp}°C</p>
                </div>
            </div>
            <p>{weather.weather.description}</p>
            <div className="weather-data">
                <p>Wind Speed: <span>{weather.wind_spd} km/h</span></p>
                <p>Humidity: <span>{weather.rh}%</span></p>
                <p>Precipitation: <span>{weather.precip} mm</span></p>
            </div>
        </div>
    );

    if (loading) {
        return <p>Loading...</p>;
    } else if (error) {
        // Displaying error message within the UI
        // return <p>Error: API limit reached or an issue occurred. Please try again later.</p>;
        // const weather = data.data[0];
        const weather = {
            "count": 1,
            "data": [
                {
                    "app_temp": 31.2,
                    "aqi": 98,
                    "city_name": "Lucknow",
                    "clouds": 100,
                    "country_code": "IN",
                    "datetime": "2024-07-31:13",
                    "dewpt": 26,
                    "dhi": 0,
                    "dni": 0,
                    "elev_angle": -8.1,
                    "ghi": 0,
                    "gust": null,
                    "h_angle": 81,
                    "lat": 26.83928,
                    "lon": 80.92313,
                    "ob_time": "2024-07-31 13:33",
                    "pod": "n",
                    "precip": 0,
                    "pres": 985.2,
                    "rh": 94,
                    "slp": 999,
                    "snow": 0,
                    "solar_rad": 0,
                    "sources": [
                        "VILK",
                        "radar",
                        "satellite"
                    ],
                    "state_code": "36",
                    "station": "VILK",
                    "sunrise": "00:01",
                    "sunset": "13:24",
                    "temp": 27,
                    "timezone": "Asia/Kolkata",
                    "ts": 1722432819,
                    "uv": 0,
                    "vis": 16,
                    "weather": {
                        "icon": "a05n",
                        "description": "Fog",
                        "code": 741
                    },
                    "wind_cdir": "WSW",
                    "wind_cdir_full": "west-southwest",
                    "wind_dir": 250,
                    "wind_spd": 1.5
                }
            ]
        }.data[0];
        const istdatetime = convertToIST(weather.ob_time);
        return <WeatherDataView weather={weather} istdatetime={istdatetime} error={true}/>;
    } else if (!data || !data.data || data.data.length === 0) {
        return <p>No data available</p>;
    } else {
        const weather = data.data[0];
        const istdatetime = convertToIST(weather.ob_time);
        return <WeatherDataView weather={weather} istdatetime={istdatetime} error={false}/>;
    }
};

const convertToIST = (utcDateString) => {
    const date = new Date(utcDateString);
    const offset = 5 * 60 + 30; // 5 hours 30 minutes in minutes
    const istDate = new Date(date.getTime() + offset * 60 * 1000);
    return istDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
};

export default AppMain;
