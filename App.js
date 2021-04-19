import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { WEATHER_API_KEY } from '@env';

import WeatherContext from './context/WeatherContext';

import CurrentForecast from './components/CurrentForecast';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';
import Details from './components/Details';

export default function App() {
  const [weather, setWeather] = useState({
    city:'Zagreb',
    unit:'metric',
    temp:'',
    conditions:'',
    wind:'',
    humidity:'',
    sunrise:'',
    sunset:'',
    lat:'45.8153',
    log:'15.9665',
    daily:'',
    hourly:'',
    isLoading: true,
  })

  useEffect(() => {
    fetchWeather()
  }, [weather.city, weather.lat, weather.log])

  const fetchWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weather.lat}&lon=${weather.log}&appid=${WEATHER_API_KEY}&units=${weather.unit}`)
      .then(response => response.json())
      .then(data => {
        setWeather((prevState) => ({
          ...prevState,
          temp: data.current.temp,
          feelsLike: data.current.feels_like,
          conditions: data.current.weather[0].main,
          wind: data.current.wind_speed,
          humidity: data.current.humidity,
          sunrise: data.current.sunrise,
          sunset: data.current.sunset,
          daily: data.daily,
          hourly: data.hourly,
          isLoading:false
        }))    
      })
  }

  return (
    <WeatherContext.Provider value={{ weather, setWeather, fetchWeather }}>
      <ScrollView style={styles.container}>
        <CurrentForecast />
        <DailyForecast />
        <HourlyForecast />
        <Details />
        <StatusBar style="auto" />
      </ScrollView>
    </WeatherContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A5D8FF',
  },
});
