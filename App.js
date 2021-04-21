import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { WEATHER_API_KEY } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

import WeatherContext from './context/WeatherContext';

import CurrentForecast from './components/CurrentForecast';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';
import Details from './components/Details';
import TopBar from './components/TopBar';
import AlgoliaSearch from './components/AlgoliaSearch';

export default function App() {
  const [weather, setWeather] = useState({
    city: '',
    unit:'metric',
    temp:'',
    conditions:'',
    wind:'',
    humidity:'',
    sunrise:'',
    sunset:'',
    lat: '',
    log: '',
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
    // Get data from AsyncStorage
    if (weather.lat === '' && weather.log === '') {
      getData()
    } else {
      fetchWeather()
    }
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

  // Reading object value from AsyncStorage
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('city')
      const objValue = JSON.parse(jsonValue)
    
      if(jsonValue !== null) {
        setWeather((prevState) => ({
          ...prevState,
          city: objValue.city,
          lat: objValue.lat,
          log: objValue.log,
        }))
      }
      console.log('getData:', jsonValue);
    } catch(e) {
      console.log('getData:', e)
    }
  }

  if (weather.isLoading) {
    return null
  }

  if (!weather.search) {
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
