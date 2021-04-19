import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import WeatherContext from '../context/WeatherContext';

export default function Details() {
  const { details } = useContext(WeatherContext);

  const UVindex = (value) => {
    if (value <= 2) {
      return 'Low'
    } else if (value >= 3 && value <= 5) {
      return 'Moderate'
    } else if (value >= 6 && value <= 7) {
      return 'High'
    } else if (value >= 8 && value <= 10) {
      return 'Very High'
    } else if (value >= 11) {
      return 'Extreme'
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details</Text>

      <View style={styles.detailsContainer}>
        <MaterialCommunityIcons name="weather-windy" size={28} color="#555" />
        <View style={styles.textContainer}>
          <Text style={styles.conditionText}>Wind</Text>
          <Text style={styles.conditionValue}>{Math.round(details.wind)} kph</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <MaterialCommunityIcons name="water-percent" size={28} color="#555" />
        <View style={styles.textContainer}>
          <Text style={styles.conditionText}>Humidity</Text>
          <Text style={styles.conditionValue}>{details.humidity} %</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <MaterialCommunityIcons name="speedometer" size={28} color="#555" />
        <View style={styles.textContainer}>
          <Text style={styles.conditionText}>UV index</Text>
          <Text style={styles.conditionValue}>{details.uv} { UVindex(Math.round(details.uvi)) }</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <MaterialCommunityIcons name="eye" size={28} color="#555" />
        <View style={styles.textContainer}>
          <Text style={styles.conditionText}>Pressure</Text>
          <Text style={styles.conditionValue}>{details.pressure} hPa</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <MaterialCommunityIcons name="water-outline" size={28} color="#555" />
        <View style={styles.textContainer}>
          <Text style={styles.conditionText}>Dew point</Text>
          <Text style={styles.conditionValue}>{Math.round(details.dew)} °C</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <MaterialCommunityIcons name="cloud-outline" size={28} color="#555" />
        <View style={styles.textContainer}>
          <Text style={styles.conditionText}>Cloud cover</Text>
          <Text style={styles.conditionValue}>{details.cloud} %</Text>
        </View>
      </View>

      <View style={[styles.detailsContainer, { marginBottom: 0 }]}>
        <MaterialCommunityIcons name="water" size={28} color="#555" />
        <View style={styles.textContainer}>
          <Text style={styles.conditionText}>Probability of precipitation</Text>
          <Text style={styles.conditionValue}>{details.pop} %</Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginBottom: 20
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 20
  },
  detailsContainer: {
    flexDirection: 'row',
    marginBottom: 30
  },
  textContainer: {
    paddingLeft: 10
  },
  conditionText: {
    fontSize: 16,
    paddingBottom: 5
  },
  conditionValue: {
    color: '#888',
    fontSize: 16
  }

});
