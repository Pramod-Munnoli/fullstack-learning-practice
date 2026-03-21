import { useState } from "react";
import Searchbox from "./Searchbox";
import Info from "./InfoBox";


export default function WeatherApp(){
    let [WeatherInfo,setWeatherInfo] = useState({
        city: "Wonderland",
        country :"IN",
        temp: 27.58, 
        tempMin: 27.58,
        tempMax:9,
        weather: 'clear sky', 
        humidity :19, 
    });

    let updateInfo = (newInfo)=>{
        setWeatherInfo(newInfo);
    }

    return(
        <div>
            <h1>Weather App</h1>
            <Searchbox updateInfo={updateInfo} />
            <Info  info={WeatherInfo}/>
        </div>
    )
}