import logo from './logo.svg';
import './App.css';
import Search from './Search';
import Navbar from './Navbar';
import Card from './Card';
import { useState, useEffect } from 'react';
import Carousel from './Carousel';
import Carousel2 from './Carousel2';
import MoreInfo from './MoreInfo';
import Footer from './Footer';

function App() {

const [stateOfTemp, setStateOfTemp] = useState("")
const [state2, setState2] = useState("kolkata")
const [stateOfCity, setStateOfCity] = useState("kolkata")


// to fetch geolocation, if the user grants...

const [fetchGeolocation, setFetchGeolocation] = useState(true);

useEffect(() => {
  if (fetchGeolocation) {
    const geolocationTimeout = setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    }, 1000);

    return () => clearTimeout(geolocationTimeout);
  }
}, [fetchGeolocation]);

const successCallback = (position) => {
  console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  reverseGeocode(latitude, longitude);
  setFetchGeolocation(false); // Prevent further geolocation fetching
};

const errorCallback = (error) => {
  console.log(error);
};



// reverse Geocode to convert lat, lon to city name.

function reverseGeocode(latitude, longitude) {
  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
  // const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  const apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=29ec8ca11c3e92dff01dc04226fd4802`



  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const location = data[0];
        const cityName = location.name;
        console.log('City:', cityName);
        // setState(cityName)
        // setState2(cityName)
        setStateOfCity(cityName)
        
        
        handle(cityName)//


        setStateOfTemp(cityName)
      } else {
        console.log('No results found');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  } 
  
  
  
  // handle function is used to fetch location data from API-1

// const handle = async (city) => {
  

//   console.log(city)

//   const url = `https://foreca-weather.p.rapidapi.com/location/search/${city}?lang=en&country=`
//     const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': 'aff5d228demsh847a17d81a5fcc4p117bc7jsn062f09a1c067',
//       'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
//     }
//   };
  
//   try {
//     const response = await fetch(url, options);
//     const result = await response.text();
//     if(result.length>0){
//     setState(result)
//     setState3(city)
//     }
//     else{
//       console.log("error")
//     }

//     await handle2(city)
  
//   } catch (error) {
//     console.error(error);
//   }
// }

// const handle2 = async (city) => {

// const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
// const options = {
  // 	method: 'GET',
  // 	headers: {
    // 		'X-RapidAPI-Key': 'aff5d228demsh847a17d81a5fcc4p117bc7jsn062f09a1c067',
    // 		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    // 	}
    // };

// try {
  // 	const response = await fetch(url, options);
  // 	const result = await response.json();
  //   if(result.length>0){
    //   handle3(city)
    //   setState(result)
    //   }
    //   else
    //   console.log("error")
    // } catch (error) {
      // 	console.error(error);
      // }
      // }
      
      // const handle3 = async (city) => {
      //   const url = `https://world-time-by-api-ninjas.p.rapidapi.com/v1/worldtime?city=${city}`;
      // const options = {
      // 	method: 'GET',
      // 	headers: {
      // 		'X-RapidAPI-Key': 'aff5d228demsh847a17d81a5fcc4p117bc7jsn062f09a1c067',
      // 		'X-RapidAPI-Host': 'world-time-by-api-ninjas.p.rapidapi.com'
      // 	}
      // };
      
      // try {
      // 	const response = await fetch(url, options);
      // 	const result = await response.json();
      //   setState2(result)
      // 	console.log(result);
      // } catch (error) {
      // 	console.error(error);
      // }
      // }
        
      const handle = async (city) => {
        const apiKey = '29ec8ca11c3e92dff01dc04226fd4802'; // Replace with your OpenWeather API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        
        // console.log("sfkjfsjg = "+city)
  try {
    const response = await fetch(url);
    const result = await response.json();

    if (response.ok) {
      console.log("point1 = "+result)
      // handle3(city);
      setStateOfTemp(result);
      // console.log(state)
      setState2(result)
      setStateOfCity(city)
    } else {
      console.log("Error:", result.message);
    }
  } catch (error) {
    console.error(error);
  }
};


// const handle2 = async (city) => {
//   const apiKey = '29ec8ca11c3e92dff01dc04226fd4802'; // Replace with your OpenWeather API key
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//   try {
//     const response = await fetch(url);
//     const result = await response.json();

//     if (response.ok) {
//       handle3(city);
//       setState(result);
//     } else {
//       console.log("Error:", result.message);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };


// const handle3 = async (city) => {
//   const apiKey = '29ec8ca11c3e92dff01dc04226fd4802'; // Replace with your OpenWeather API key
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//   try {
//     const response = await fetch(url);
//     const result = await response.json();
//     setState2(result);
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// };


  return (
    <div className="App">


<Navbar handler={handle}/>
{/* {console.log(state)} */}
      {/* <Search/> */}
      
      {console.log(stateOfCity+"lnfwnnjfllllll")}
      <Card stateOfTemp={stateOfTemp} state2={state2} stateOfCity={stateOfCity}/>
      <Carousel stateOfCity={stateOfCity}/>
      <MoreInfo stateOfCity={stateOfCity}/>
      <Carousel2 stateOfCity={stateOfCity}/>
      <Footer/>
    </div>
  );
}

export default App;
