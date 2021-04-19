import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WeatherContext from '../context/WeatherContext';


export default function DailyForecast() {
  const { weather, setWeather } = useContext(WeatherContext);
  
  return (
    <View style={styles.container}>
      <Text style={styles.temp}>{Math.round(weather.temp)}°</Text>
      <Text style={styles.conditions}>{weather.conditions}, Feels like {Math.round(weather.feelsLike)}°</Text>
      <Text style={styles.wind}>Wind - {Math.round(weather.wind)} kph</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingBottom: 20,
    paddingHorizontal: 30
  },
  temp: {
    fontSize: 52
  },
  conditions: {
    fontSize: 18,
    paddingBottom: 6
  },
  wind: {
    fontSize: 18
  }
});
