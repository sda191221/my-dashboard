import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain, faSnowflake, faBolt } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from 'react-query';
import { Box, CircularProgress, Typography } from '@mui/material';
import classes from './Weather.module.css'

const Weather = () => {
  const { data, error, isLoading } = useQuery('weather', async () => {
    const apiKey = '6e205684ddbea424d7f00b2d9d45a350';
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const { latitude, longitude } = position.coords;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    console.log(response);
    return response.data;

  }, {
    refetchInterval: 600000, // refetch weather data every 10 minutes
    staleTime: 1800000, // consider data fresh for 30 minutes
  });

  if (error) {
    return <div>Something went wrong: {error.message}</div>;
  }

  if (isLoading || !data) {
    return <CircularProgress />;
  }

  const { name, weather, main, wind } = data;
  console.log('weather:', weather);
  console.log('weather[0]:', weather[0]);

  let icon = null;
  if (weather && weather.length > 0) {
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
  }

  return (
    <Box className={classes.weatherCard}>
      <Typography variant="h4" className={classes.name}>{name}</Typography>
      <Typography variant="h1" className={classes.temperature}>{Math.round(main.temp)}°C</Typography>
      <Typography variant="h1" className={classes.icon}>{icon}</Typography>
      <Typography variant="subtitle1" className={classes.description}>{weather[0].description}</Typography>
      <Box className={classes.dataContainer}>
        <Box className={classes.dataColumn}>
          <Typography variant="subtitle1" className={classes.dataLabel}>Feels like</Typography>
          <Typography variant="h5" className={classes.dataValue}>{Math.round(main.feels_like)}°C</Typography>
        </Box>
        <Box className={classes.dataColumn}>
          <Typography variant="subtitle1" className={classes.dataLabel}>Humidity</Typography>
          <Typography variant="h5" className={classes.dataValue}>{Math.round(main.humidity)}%</Typography>
        </Box>
        <Box className={classes.dataColumn}>
          <Typography variant="subtitle1" className={classes.dataLabel}>Wind speed</Typography>
          <Typography variant="h5" className={classes.dataValue}>{Math.round(wind.speed)} km/h</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Weather;