import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';
import './App.css';

export default function Searchbox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false); // Fixed typo here

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API = "36b2c6a94778ad950bc4044272af21c9";

    let GetWeather = async () => {
        let response = await fetch(`${API_URL}?q=${city}&appid=${API}&units=metric`);
        let jsoneRes = await response.json();
        let result = {
            temp: jsoneRes.main.temp,
            tempMin: jsoneRes.main.temp_min,
            tempMax: jsoneRes.main.temp_max,
            humidity: jsoneRes.main.humidity,
            weather: jsoneRes.weather[0].description,
            city: jsoneRes.name,
            country: jsoneRes.sys.country,
        };
        return result;
    };

    let handleCityChange = (e) => {
        setCity(e.target.value);
        if (error) setError(false); // Clear error when user starts typing again
    };

    let hadleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(false);
            let newInfo = await GetWeather();
            updateInfo(newInfo); // Only updates if GetWeather succeeds
            setCity("");
        } catch {
            setError(true); // Now correctly identifies "City not found"
        }
    };

    return (
        <div className='searchbox'>
            <form onSubmit={hadleSubmit}>
                <TextField 
                    onChange={handleCityChange} 
                    value={city} 
                    id="CityName" 
                    label="City name" 
                    variant="outlined" 
                    required 
                    error={error} // Standard MUI way to show error state
                />
                <br /> <br />
                <Button variant="contained" type='submit'>Search</Button>
                {error && <p style={{ color: "red" }}>No such place exists in our records!</p>}
            </form>
        </div>
    );
}