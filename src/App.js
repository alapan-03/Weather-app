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

const [state, setState] = useState("")
const [state2, setState2] = useState("kolkata")
const [state3, setState3] = useState("kolkata")


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
        setState3(cityName)
        
        
        handle2(cityName)


        setState(cityName)
      } else {
        console.log('No results found');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  } 
  
  
  
  // handle function is used to fetch location data from API-1

const handle = async (city) => {
  

  console.log(city)

  const url = `https://foreca-weather.p.rapidapi.com/location/search/${city}?lang=en&country=`
    const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'aff5d228demsh847a17d81a5fcc4p117bc7jsn062f09a1c067',
      'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    if(result.length>0){
    setState(result)
    setState3(city)
    }
    else{
      console.log("error")
    }
    // console.log(result)
    // if(result.length>0){
    //   const locationId = result[0].id
    //   handle2(locationId)
    // }
    await handle2(city)
    // setState(result)
    // console.log(result);
  } catch (error) {
    console.error(error);
  }
}

const handle2 = async (city) => {
//   console.log(id)
//   const url = `https://foreca-weather.p.rapidapi.com/current/${id}?alt=0&tempunit=C&windunit=MS&tz=Europe%2FLondon&lang=en`;
//   const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': 'aff5d228demsh847a17d81a5fcc4p117bc7jsn062f09a1c067',
//       'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
//     }
//   };
  
//   try {
//     const response = await fetch(url, options);
//     const result = await response.json();
//     setState(result)
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// }

const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'aff5d228demsh847a17d81a5fcc4p117bc7jsn062f09a1c067',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
  if(result.length>0){
	// console.log(result);
  handle3(city)
  setState(result)
  }
  else
  console.log("error")
} catch (error) {
	console.error(error);
}
}

const handle3 = async (city) => {
  const url = `https://world-time-by-api-ninjas.p.rapidapi.com/v1/worldtime?city=london`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'aff5d228demsh847a17d81a5fcc4p117bc7jsn062f09a1c067',
		'X-RapidAPI-Host': 'world-time-by-api-ninjas.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
  setState2(result)
	console.log(result);
} catch (error) {
	console.error(error);
}
}
  
  return (
    <div className="App">


<Navbar handler={handle}/>
{/* {console.log(state)} */}
      {/* <Search/> */}
      
      <Card state={state} state2={state2} state3={state3}/>
      <Carousel state={state3}/>
      <MoreInfo state={state3}/>
      <Carousel2 state={state3}/>
      <Footer/>
    </div>
  );
}

export default App;
