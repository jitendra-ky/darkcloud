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
            <AdditionInfo weather={weather} />
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

const convertToIST2 = (utcTimeString) => {
    // UTC time is provided as a string in HH:mm format
    const [hours, minutes] = utcTimeString.split(':').map(Number);

    // Create a new Date object with the UTC time
    const utcDate = new Date(Date.UTC(1970, 0, 1, hours, minutes));

    // Convert UTC time to IST (UTC + 5:30)
    const istOffset = 5 * 60 + 30; // IST offset in minutes
    const istDate = new Date(utcDate.getTime() + istOffset * 60 * 1000);

    // Format the IST date as HH:mm
    const istHours = String(istDate.getUTCHours()).padStart(2, '0');
    const istMinutes = String(istDate.getUTCMinutes()).padStart(2, '0');

    return `${istHours}:${istMinutes}`;
};


const AdditionInfo = ({ weather }) => {
    const sunriseIST = convertToIST2(weather.sunrise);
    const sunsetIST = convertToIST2(weather.sunset);

    return (
        <div className="additional-info">
            <h3>Additional Information</h3>
            <table>
                <tbody>
                    <tr>
                        <td><strong>City:</strong></td>
                        <td>{weather.city_name}</td>
                    </tr>
                    <tr>
                        <td><strong>Country:</strong></td>
                        <td>{weather.country_code}</td>
                    </tr>
                    <tr>
                        <td><strong>Temperature:</strong></td>
                        <td>{weather.temp}°C (Feels like {weather.app_temp}°C)</td>
                    </tr>
                    <tr>
                        <td><strong>Weather Description:</strong></td>
                        <td>{weather.weather.description}</td>
                    </tr>
                    <tr>
                        <td><strong>Air Quality Index (AQI):</strong></td>
                        <td>{weather.aqi} (Moderate)</td>
                    </tr>
                    <tr>
                        <td><strong>Humidity:</strong></td>
                        <td>{weather.rh}%</td>
                    </tr>
                    <tr>
                        <td><strong>Pressure:</strong></td>
                        <td>{weather.pres} hPa (Surface Level), {weather.slp} hPa (Sea Level)</td>
                    </tr>
                    <tr>
                        <td><strong>Wind Speed:</strong></td>
                        <td>{weather.wind_spd} m/s</td>
                    </tr>
                    <tr>
                        <td><strong>Wind Direction:</strong></td>
                        <td>{weather.wind_cdir_full} ({weather.wind_dir}°)</td>
                    </tr>
                    <tr>
                        <td><strong>Visibility:</strong></td>
                        <td>{weather.vis} km</td>
                    </tr>
                    <tr>
                        <td><strong>Cloud Cover:</strong></td>
                        <td>{weather.clouds}%</td>
                    </tr>
                    <tr>
                        <td><strong>Precipitation:</strong></td>
                        <td>{weather.precip} mm</td>
                    </tr>
                    <tr>
                        <td><strong>Solar Radiation:</strong></td>
                        <td>{weather.solar_rad} W/m²</td>
                    </tr>
                    <tr>
                        <td><strong>UV Index:</strong></td>
                        <td>{weather.uv}</td>
                    </tr>
                    <tr>
                        <td><strong>Date and Time:</strong></td>
                        <td>{weather.ob_time}</td>
                    </tr>
                    <tr>
                        <td><strong>Sunrise:</strong></td>
                        <td>{sunriseIST} (IST)</td>
                    </tr>
                    <tr>
                        <td><strong>Sunset:</strong></td>
                        <td>{sunsetIST} (IST)</td>
                    </tr>
                    <tr>
                        <td><strong>Timezone:</strong></td>
                        <td>{weather.timezone}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};




export default AppMain;
