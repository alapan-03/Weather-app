import React, { useState, useEffect } from "react";
import Card from "./Card";
import icon1 from "./icon1.gif";
import cloud from "./overcast.png";
import sun from "./sun.png";
import rain from "./rain.png";

const Carousel2 = (props) => {
  const [forecastData, setForecastData] = useState([]);
  const apiKey = "29ec8ca11c3e92dff01dc04226fd4802";
  const city = props.state; // Change this to the city you want to fetch data for

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
        );
        const data = await response.json();
        setForecastData(data.list);
        //   console.log(forecastData)
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };

    fetchForecastData();
  }, [city, apiKey]);

  useEffect(() => {
    // console.log(forecastData);
  }, [forecastData]);

  function groupByDate() {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const grouped = {};
    const d = new Date();
    let i = d.getDay();
    forecastData.forEach((item) => {
      // if (new Date(item.dt * 1000).getDay() > i) {
        let l = new Date(item.dt * 1000).getDay();

        const date = daysOfWeek[new Date(item.dt * 1000).getDay()];

        if (!grouped[date]) grouped[date] = [];

        grouped[date].push(item);
      // }
    });
    return grouped;
  }

  const group = groupByDate();

  return (

    <div className="mt-5" style={{transform:"translate(3rem, -10rem)"}}>
      <div className="grid container text-center outer-box" style={{position:"relative", top:"16rem", left:"6rem", border:"2px soled black", borderRadius:"10px"}}>
        {Object.keys(group).map((date) => ( 
          <div key={date} className="grid container text-center" >
            <h4 className="g-col-4" style={{position:"relative", left:"-20rem", top:"3.4rem", marginBottom:"-2rem"}}>{date}</h4>
            <div  style={{transform:"translate(0, 3.4rem)"}}>
            <div>
            <span className="g-col-4" style={{fontSize:"1.4rem", marginRight:"1rem"}}>{(group[date][0].main.temp_max - 270.15).toFixed(0)}°C</span>
            <span className="g-col-4 before-img" style={{position:"relative", top:"-.1rem"}}>{(group[date][0].main.temp_min-274.15).toFixed(0)}°C</span>
</div>  
            <img
              src={
                group[date][0].weather[0].description.includes("rain")
                ? rain
                : group[date][0].weather[0].description.includes("sun")
                ? sun
                : cloud
              }
              className="weather-icon g-col-4"
              alt={group[date][0].weather[0].description}
              style={{width:"25px", position:"relative", top:"-2rem", left:"-8rem"}}
              />
              </div>
          </div>
        ))}
      </div>
    </div>


  );
};
export default Carousel2;
