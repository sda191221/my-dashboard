import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain, faSnowflake, faBolt } from '@fortawesome/free-solid-svg-icons';
import './Weather.css';
import { useQuery } from 'react-query';


const Weather = () => {
  const { data, error, isLoading } = useQuery('weather', async () => {
    const apiKey = '6e205684ddbea424d7f00b2d9d45a350';
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const { latitude, longitude } = position.coords;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    return response.data;
  }, {
    refetchInterval: 600000, // refetch weather data every 10 minutes
    staleTime: 1800000, // consider data fresh for 30 minutes
  });

  if (error) {
    return <div>Something went wrong: {error.message}</div>;
  }
  if (isLoading || !data) {
    return <div>Loading...</div>;
  }
  const { name, weather, main } = data;
  let icon = null;
  switch (weather[0].main) {
    case 'Clear':
      icon = <FontAwesomeIcon icon={faSun} />;
      break;
    case 'Clouds':
      icon = <FontAwesomeIcon icon={faCloud} />;
      break;
    case 'Rain':
      icon = <FontAwesomeIcon icon={faCloudRain} />;
      break;
    case 'Snow':
      icon = <FontAwesomeIcon icon={faSnowflake} />;
      break;
    case 'Thunderstorm':
      icon = <FontAwesomeIcon icon={faBolt} />;
      break;
    default:
      icon = <FontAwesomeIcon icon={faSun} />;
  }


  return (
    <div className="weather-container">
      <div className="location">{name}</div>
      <div className="icon">{icon}</div>
      <div className="temperature">{Math.round(main.temp)}°C</div>
      <div className="condition">{weather[0].description}</div>
    </div>
  );
};

export default Weather;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSun, faCloud, faCloudRain, faSnowflake, faBolt } from '@fortawesome/free-solid-svg-icons';
// import './Weather.css';

// const Weather = () => {
//   const [weatherData, setWeatherData] = useState(null);
//   const [error, setError] = useState(null);

//   const getWeatherData = async (latitude, longitude) => {
//     try {
//       const apiKey = '6e205684ddbea424d7f00b2d9d45a350';
//       const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
//       const response = await axios.get(url);
//       setWeatherData(response.data);
//     } catch (error) {
//       setError(error);
//     }
//   };

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       getWeatherData(position.coords.latitude, position.coords.longitude);
//     });
//   }, []);

//   if (error) {
//     return <div>Something went wrong: {error.message}</div>;
//   }

//   if (!weatherData) {
//     return <div>Loading...</div>;
//   }

//   const { name, weather, main } = weatherData;

//   let icon = null;
//   switch (weather[0].main) {
//     case 'Clear':
//       icon = <FontAwesomeIcon icon={faSun} />;
//       break;
//     case 'Clouds':
//       icon = <FontAwesomeIcon icon={faCloud} />;
//       break;
//     case 'Rain':
//       icon = <FontAwesomeIcon icon={faCloudRain} />;
//       break;
//     case 'Snow':
//       icon = <FontAwesomeIcon icon={faSnowflake} />;
//       break;
//     case 'Thunderstorm':
//       icon = <FontAwesomeIcon icon={faBolt} />;
//       break;
//     default:
//       icon = <FontAwesomeIcon icon={faSun} />;
//   }

//   return (
//     <div className="weather-container">
//       <div className="location">{name}</div>
//       <div className="icon">{icon}</div>
//       <div className="temperature">{Math.round(main.temp)}°C</div>
//       <div className="condition">{weather[0].description}</div>
//     </div>
//   );
// };

// export default Weather;