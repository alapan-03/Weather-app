import Card from "./Card";
import icon1 from "./icon1.gif"
import cloud from "./overcast.png"
import sun from "./sun.png"
import rain from "./rain.png"
import { MoonStar, CloudMoonRain, CloudMoon, Sun, CloudSun, CloudDrizzle} from "lucide-react";

import React, { useState, useEffect } from 'react';

const Carousel = (props) => {
  const [error, setError] = useState(false);
  const [forecastData, setForecastData] = useState([]);
  const apiKey = '29ec8ca11c3e92dff01dc04226fd4802';
  const city = props.state; // Change this to the city you want to fetch data for

  function imp(){
    return icon1    
  }
  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
        const data = await response.json();
        setForecastData(data.list);
        setError(false)
      } catch (error) {
        console.error('Error fetching forecast data:', error);
        setError(true)
      }
    };

    fetchForecastData();
  }, [city, apiKey]);

  let curr = new Date().toISOString().split('T')[0]

  const aaa = forecastData.filter(item=>
    item.dt_txt.includes(curr))

    // Collect the first 6 forecast items for the current day
  let firstSixForecasts = aaa.slice(0, 6);

  // Check if we have fewer than 6 forecasts for the current day
  if (firstSixForecasts.length < 6) {
    // Calculate how many more forecasts are needed
    const remainingForecastCount = 6 - firstSixForecasts.length;

    // Filter forecast items from the next day(s)
    const nextDayForecasts = forecastData.filter(
      (item) => !item.dt_txt.includes(curr)
    );

    // Append forecast items from the next day(s) to meet the requirement
    firstSixForecasts = [
      ...firstSixForecasts,
      ...nextDayForecasts.slice(0, remainingForecastCount),
    ];
  }

  
    
    // return (
    //   <div className="forecast-container">
      {/* <h4>Today:</h4> */}
      {/* <ul className="forecast container mt-5" style={{boxShadow:".1rem .1rem .2rem", borderRadius:"20px", backgroundColor:"#faf7fa"}}> */}
      {/* <ul className="forecast container mt-5">
        {firstSixForecasts.map((item, index) => {

          const forecastTime = new Date(item.dt * 1000).getHours();
          const isNightTime = forecastTime >= 19 || forecastTime < 6;

          <li key={index}>
<br/>
          {(item.main.temp-273.15).toString().split(".")[0]}°C<br />
          {item.weather[0].description.includes("rain") && item.dt <= 1692489600 &&<img src={rain} className="icon-rain mb-3 mt-3" style={{width:"30px",display:"block"}}/>}

          {item.weather[0].description.includes("sky") && item.dt <= 1692489600 &&<img src={sun} className="icon-sun mb-3 mt-3" style={{width:"30px", display:"block"}}/>} */}

          {/* {item.weather[0].description.includes("cloud") && item.dt <= 1692489600 &&<img src={cloud} className="icon-cloud mb-3 mt-3" style={{width:"30px", display:"block"}}/>}
          <p style={{transform:"translate(0, .9rem"}}>{item.dt > 1692489600 && item.weather[0].description.includes("cloud") && <CloudMoon strokeWidth={1.5} size={37}/>}</p> */}
          {/* {item.dt} */}
          {/* <p>{item.dt > 1692489600 && !item.weather[0].description.includes("cloud") && <MoonStar size={30}/>}</p>
          {new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}<br/><br/>
          {(item.dt * 1000)} */}
          {/* {item.weather[0].description} */}

//             </li>
// })}

  return (
    <div className="forecast-container">
      <ul className="forecast container mt-5">
        {firstSixForecasts.map((item, index) => {
          // Compare forecast time with 7 PM (19:00)
          const forecastTime = new Date(item.dt * 1000).getHours();
          const isNightTime = forecastTime >= 19 || forecastTime < 6;
  
          return (
            <li key={index}>
              <br />
              <p style={{transform:"translate(0, 0rem)"}}>
              {(item.main.temp - 273.15).toString().split(".")[0]}°C<br />
              </p>
              {/* Weather Icons */}
              {item.weather[0].description.includes("rain") && (isNightTime ? <CloudMoonRain size={30} strokeWidth={1.5}/> : <CloudDrizzle strokeWidth={2} size={27}/>)}
              {item.weather[0].description.includes("sky") && (isNightTime ? <MoonStar size={30} /> : <Sun size={30} />)}
              {item.weather[0].description.includes("cloud") && (isNightTime ? <CloudMoon size={30} strokeWidth={1.5} /> : <CloudSun size={30} />)}
              
              {/* Time */}
              <p style={{transform:"translate(0, 1rem)"}}>
              {new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}<br /><br />
              </p>
              {/* Unix timestamp */}
              {/* {item.dt * 1000} */}
            </li>
          );
        })}
      </ul>
    </div>
  );
  
       
};

export default Carousel;
