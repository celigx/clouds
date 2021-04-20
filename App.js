import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { WEATHER_API_KEY } from '@env';

import WeatherContext from './context/WeatherContext';

import CurrentForecast from './components/CurrentForecast';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';
import Details from './components/Details';
import TopBar from './components/TopBar';
import AlgoliaSearch from './components/AlgoliaSearch';

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
    search: false,
  })

  const [details, setDetails] = useState({
    wind: '',
    humidity: '',
    uv: '',
    pressure: '',
    dewPoint: '',
    cloudCover: '',
    pop: ''
  })

  const [refreshing, setRefreshing] = useState(false)

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
          daily: data.daily,
          hourly: data.hourly,
          isLoading: false
        }))
        setDetails((prevState) => ({
          ...prevState,
          wind: data.daily[0].wind_speed,
          humidity: data.daily[0].humidity,
          uv: data.daily[0].uvi,
          pressure: data.daily[0].pressure,
          dew: data.daily[0].dew_point,
          cloud: data.daily[0].clouds,
          pop: data.daily[0].pop
        }))
      })
  }


  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const pullToRefresh = () => {
    setRefreshing(true)
    fetchWeather()
    wait(2000).then(() => setRefreshing(false))
  }

  if (!weather.search && !weather.isLoading) {
    return (
      <WeatherContext.Provider value={{ weather, setWeather, details, fetchWeather }}>
        <ScrollView 
          style={styles.container} 
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={pullToRefresh} />
          }
        >
          <TopBar />
          <CurrentForecast />
          <DailyForecast />
          <HourlyForecast />
          <Details />
          <StatusBar style="auto" />
        </ScrollView>
      </WeatherContext.Provider>
    );
  } else {
    return (
      <WeatherContext.Provider value={{ weather, setWeather, details, fetchWeather }}>
        <AlgoliaSearch />
        <StatusBar style="auto" />
      </WeatherContext.Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A5D8FF',
  },
});
