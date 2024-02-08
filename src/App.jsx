import "./App.css";
import { FaSearch } from "react-icons/fa";
import clear_img from "./Assets/clear.png";
import humidity_img from "./Assets/humidity.png";
import wind_img from './Assets/wind.png';
import cloud_img from './Assets/cloud.png';
import drizzle_img from './Assets/drizzle.png';
import rain_img from './Assets/rain.png';
import snow_img from './Assets/snow.png';
import { useState } from "react";

function App() {

  const API_KEY = '69f3c78aabcb88ab31a54a65c82fe0ce';
  const [wicon, setWicon] = useState(clear_img)

  const search = async () => {
    const element = document.getElementsByClassName("loc")
    if(element[0].value === ""){
      return 0;
    }

    let URL = `http://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${API_KEY}`

    let response = await fetch(URL)
    let data = await response.json();

    const temperature = document.getElementsByClassName('weather-temp');
    const location = document.getElementsByClassName('weather-loc');
    const windSpeed = document.getElementsByClassName('wind-speed');
    const humidity = document.getElementsByClassName('Humidity');

    humidity[0].innerHTML = data.main.humidity + "%";
    windSpeed[0].innerHTML = Math.round(data.wind.speed) + " Km/h";
    location[0].innerHTML = data.name;
    temperature[0].innerHTML = Math.round (data.main.temp) + "°C";

    
    if(data.weather[0].icon=== "02d" || data.weather[0].icon === "02n"){
      setWicon(cloud_img)
    }
    else if(data.weather[0].icon=== "03d" || data.weather[0].icon === "03n"){
      setWicon(drizzle_img)
    }
    else if(data.weather[0].icon=== "04d" || data.weather[0].icon === "04n"){
      setWicon(drizzle_img)
    }
    else if(data.weather[0].icon=== "09d" || data.weather[0].icon === "09n"){
      setWicon(rain_img)
    }
    else if(data.weather[0].icon=== "10d" || data.weather[0].icon === "10n"){
      setWicon(rain_img)
    }
    else if(data.weather[0].icon=== "13d" || data.weather[0].icon === "13n"){
      setWicon(snow_img)
    }
    else{
      setWicon(clear_img)
    }
  }

  return (
    <main>
      <div className="container">
        <div className="search-panel">
          <input type="text" className="loc" id="loc" placeholder="Enter Location" />
          <button className="search-btn" onClick={() => {search()}}>
            <FaSearch />
          </button>
        </div>
        <div className="wthr-img">
          <img src={wicon} alt="Image of clear weather" />
        </div>
        <div className="weather-temp">24°C</div>
        <div className="weather-loc">London</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_img} alt="Image of Humidity" />
            <div className="data">
              <div className="Humidity text">60%</div>
              <div className="text1">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_img} alt="Image of Wind" />
            <div className="data">
              <div className="wind-speed text">20 Km/h</div>
              <div className="text1">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
