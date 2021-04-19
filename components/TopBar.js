import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View, StatusBar, Text } from 'react-native';
import WeatherContext from '../context/WeatherContext';
import { Feather } from '@expo/vector-icons';


export default function TopBar() {
  const { weather, setWeather } = useContext(WeatherContext);

  const handleSearch = () => {
    setWeather((prevState) => ({
      ...prevState,
      search: true
    }))
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.city}>{weather.city}</Text>
      <TouchableOpacity onPress={handleSearch}>
        <Feather name="search" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: StatusBar.currentHeight + 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  city: {
    fontSize: 20
  }
});
