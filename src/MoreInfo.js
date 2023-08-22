import { useState, useEffect } from "react";
export default function MoreInfo(props) {

    const [forecastData, setForecastData] = useState([]);
    const apiKey = "29ec8ca11c3e92dff01dc04226fd4802";
    const city = props.stateOfCity; // Change this to the city you want to fetch data for
  
    useEffect(() => {
      const fetchForecastData = async () => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
          );

          if (!response.ok) {
            throw new Error("City not found"); // Manually throw an error for non-200 responses
          }

          const data = await response.json();
          setForecastData(data.list);
          //   console.log(forecastData)
        } catch (error) {
          console.error("Error fetching forecast data:", error);
        }
      };
  
      fetchForecastData();
    }, [city, apiKey]);


    // const filterData = (date) => {
    //     return forecastData.filter((item)=>{
    //         const itemDate = new Date(item.dt * 1000).toLocaleDateString();
    //         return itemDate===date
    //     }).map((item)=>(
            // {console.log("fkokmfk")}
            
//         <div key={item.dt} className="info" style={{width:"1000px"}}>
//             <ul class="list-group" style={{width:"500px", display:"flex"}}>
//   <li class="list-group-item" >{item.main.temp}</li>
//   <li class="list-group-item" style={{display:"flex", fontSize:"1.3rem"}}>Humidity: <p style={{position:"relative", left:"2rem"}}>{item.main.humidity}</p></li>
//   <li class="list-group-item">A third item</li>
//   <li class="list-group-item">A fourth item</li>
//   <li class="list-group-item">And a fifth one</li>
// </ul>
//         </div>
        
{/* <ul className="container text-center info-1">
  <li>{item.main.temp}</li>
  <li>{item.main.humidity}</li>
</ul>

        ))
    
} */}

const filterData = (date) => {
  const currentDate = new Date(date);
  const relevantData = forecastData.filter((item) => {
      const itemDate = new Date(item.dt * 1000);
      // console.log(item.main.humidity)
      return itemDate.toLocaleDateString() === currentDate.toLocaleDateString();
  });

  // const totalHumidity = relevantData.reduce((sum, item) => sum + parseInt(item.main.humidity), 0);
  
  // const averageHumidity = totalHumidity / relevantData.length;
  
  
  const totalHumidity = relevantData.reduce((sum, item) => {
    // Check if humidity data is available before adding to sum
    if (item.main && typeof item.main.humidity === 'number') {
      return sum + item.main.humidity;
    }
    return sum; // Ignore this item's humidity
  }, 0);
  
  const averageHumidity = relevantData.length > 0 ? totalHumidity / relevantData.length : 0;

  console.log(averageHumidity)
  const totalWindSpeed = relevantData.reduce((sum, item) => sum + item.wind.speed, 0);
  const averageWindSpeed = totalWindSpeed / relevantData.length;
  const weatherDescription = relevantData.length > 0 ? relevantData[0].weather[0].description : '';

  return (

<div class="grid container text-center info-1" style={{backgroundColor:"#e3e2e1", border:".1px solid #bfbebd", transform:"translateY(2rem)"}}>
  <div class="g-col-6 g-col-md-4"><p style={{fontSize:"1.3rem", marginBottom:"-2px", marginTop:"8px"}}>Humidity </p><br></br>{averageHumidity}%</div>
  <div style={{backgroundColor:"#bfbebd", height:"6rem", border:"1px solid #a1a09f"}}></div>
  <div class="g-col-6 g-col-md-4"><p style={{fontSize:"1.3rem", marginBottom:"-2px", marginTop:"8px"}}>Wind Speed </p><br></br>{averageWindSpeed.toFixed(1)} m/s</div>
  <div style={{backgroundColor:"#bfbebd", height:"6rem", border:"1px solid #a1a09f"}}></div>
  <div class="g-col-6 g-col-md-4"><p style={{fontSize:"1.3rem", marginBottom:"-2px", marginTop:"8px"}}>Forecast </p><br></br>{weatherDescription}</div>
</div>

      // <div className="container text-center info-1">
      //   <p>Humidity</p>
      //     <p style={{transform:"translate(-8.2rem, 1rem)"}}><br></br>{averageHumidity.toFixed(2)}</p>
      //     <p style={{display:"block"}}>Wind speed</p>
      //     <p><br></br>{averageWindSpeed.toFixed(2)} m/s</p>
      // </div>
  );
};

const d = new Date();
    return <div>{filterData(d.toLocaleDateString())}</div>;
}