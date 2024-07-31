import { IoSearchOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

const AppMain = () => {
    return (
        <div className="main-div">
           
            <SelectArea />
            <ViewInfo />
        </div>
    );
};

const SelectArea = () => {
    return (
        <div className="select-area">
           <input type="text" placeholder="Enter city name" ></input>
            <button className="search-button"><IoSearchOutline /></button>   {/*  putting react icon  */}

        </div>
    );
}

const ViewInfo = () => {
    return (
        <div className="view-info">
             <p id="city-name">Lucknow</p>

             <div className="date-time"> 
                <p>Sat , 6 May ,</p>
                 <span>  23:44 </span> 
             </div>

             <div className="weather-info">
                <div className="weather-type">Snow</div>
                <div className="weather-temp" >
                    <div className="temperature">
                        <p id="temp">8</p>
                        <p>C | F</p>
                    </div>
                    <div id="temp-info"> 7 | 2</div>
                </div>
             </div>

             <div className="weather-data">
                <p>Wind : <span>10km/h</span></p>
                <p>Humidity : <span>20%</span></p>
                <p>Precipitation : <span>10%</span></p>
             </div>

        </div>
    );
}

export default AppMain;