import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import dayjs from "dayjs";
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import WeatherContext from '../context/WeatherContext';
import { weatherConditions } from '../components/WeatherConditions';
import { tempGradient } from '../helpers'

export default function DailyForecast() {
  const { weather, setWeather } = useContext(WeatherContext);

  const renderDailyWeather = ({ item }) => {
    return (
      <View style={styles.containerWeek}>
        <Text style={styles.day}>{dayjs(item.dt * 1000).format('ddd')}</Text>
        <Text style={styles.date}>{dayjs(item.dt * 1000).format('DD/MM')}</Text>
        <Feather name={weatherConditions[item.weather[0].main].icon} size={24} color={weatherConditions[item.weather[0].main].color} />
        <View style={styles.containerTemp}>
          <Text style={styles.tempMax}>{Math.round(item.temp.max)}°</Text>
          <LinearGradient
            colors={[tempGradient(Math.round(item.temp.max)), tempGradient(Math.round(item.temp.min))]}
            start={{ x:0, y:0.4 }}
            style={styles.gradient}
          />
          <Text style={styles.tempMin}>{Math.round(item.temp.min)}°</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily forecast</Text>
        <FlatList
          data={weather.daily}
          renderItem={renderDailyWeather}
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
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  dailyContainer: {
    paddingVertical: 30,
  },
  containerWeek: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  day: {
    paddingBottom: 16
  },
  date: {
    color: '#999',
    paddingBottom: 16
  },
  icon: {
  },
  containerTemp: {
    paddingTop: 16,
    alignItems: 'center'
  },
  tempMax: {
    paddingBottom: 8
  },
  gradient: {
    height: 50, 
    width: 10, 
    borderRadius: 6
  },
  tempMin: {
    paddingTop: 8
  }
});
