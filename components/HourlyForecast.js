import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import dayjs from "dayjs";
import { Feather } from '@expo/vector-icons';

import WeatherContext from '../context/WeatherContext';
import { weatherConditions } from './WeatherConditions';

export default function HourlyForecast() {
  const { weather, setWeather, fetchWeather } = useContext(WeatherContext);

  const renderHourlyWeather = ({ item }) => {
    return (
      <View style={styles.containerHour}>
        <Text style={styles.time}>{dayjs(item.dt * 1000).format('HH:00')}</Text>
        <Text style={styles.date}>{dayjs(item.dt * 1000).format('ddd')}</Text>
        <Feather style={styles.icon} name={weatherConditions[item.weather[0].main].icon} size={24} color={weatherConditions[item.weather[0].main].color} style={styles.icon} />
        <Text style={styles.temp}>{Math.round(item.temp)}°</Text>
        {/* Convert meters per second to kilometers per hour - 5m/s = (5 * 3.6) = 18km/h */}
        <Text style={styles.wind}>{Math.round(item.wind_speed * 3.60)} kph</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hourly forecast</Text>
      <FlatList
        data={weather.hourly}
        renderItem={renderHourlyWeather}
        keyExtractor={(item, index) => Math.random(index.id).toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 20,
    marginHorizontal: 10,
    marginBottom: 20
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  containerHour: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  time: {
    paddingBottom: 16
  },
  date: {
    color: '#999',
    paddingBottom: 16
  },
  temp: {
    paddingVertical: 16
  },
});
