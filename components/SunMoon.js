import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import dayjs from "dayjs";

import { NewMoon, WaxingCrescent, FirstQuarter, WaxingGibbous, FullMoon, WaningGibbous, ThirdQuarter, WaningCrescent } from './moonPhase';
import { Horizon } from './Horizon';

import WeatherContext from '../context/WeatherContext';

export default function SunMoon() {
  const { weather, setWeather } = useContext(WeatherContext);

  const sunrise = dayjs(weather.daily[0].sunrise * 1000).format('HH:MM')
  const sunset = dayjs(weather.daily[0].sunset * 1000).format('HH:MM')
  const moonrise = dayjs(weather.daily[0].moonrise * 1000).format('HH:MM')
  const moonset = dayjs(weather.daily[0].moonset * 1000).format('HH:MM')
  const timeNow = dayjs().format('HH:mm')

  // sunrise - sunset (05:00 - 20:00 = 15)
  const sunDuration = parseInt(sunset) - parseInt(sunrise)
  // sunset - time now
  const sunLeft = parseInt(sunset) - parseInt(timeNow)
  // line length divided by sunlight duration
  const sunDurationDivided = (450 - 35) / sunDuration
  // calculate sun position on the line
  let sunPosition = (sunDuration - sunLeft) * sunDurationDivided

  // moonrise - time of moonset (22:00 - 06:00 = 16)
  const moonDuration = parseInt(moonrise) - parseInt(moonset)
  // moonset - time now
  const moonLeft = parseInt(timeNow) - parseInt(moonset)
  // line length divided by moonLight duration
  const moonDurationDivided = (450 - 35) / moonDuration
  // calculate moon position on the line
  let moonPosition = (moonDuration - moonLeft) * moonDurationDivided

  let sunOpacity
  if (sunrise < timeNow && sunset > timeNow) {
    sunOpacity = 1
  } else if (timeNow > moonrise) {
    sunOpacity = 1
    sunPosition = 415
  } else  {
    sunOpacity = 0
  }

  let moonOpacity
  if (moonrise < timeNow && moonset > timeNow) {
    moonOpacity = 1
  } else {
    moonOpacity = 0
  }

  const moonPhase = (value) => {
    if (value === 0 || value === 1) {
      return (
        <View style={styles.moonPhase}>
          <NewMoon />
          <Text style={styles.moonPhaseText}>New moon</Text>
        </View>
      )
    } else if (value > 0 && value < 0.25) {
      return (
        <View style={styles.moonPhase}>
          <WaxingCrescent />
          <Text style={styles.moonPhaseText}>Waxing crescent</Text>
        </View>
      ) 
    } else if (value === 0.25) {
      return (
        <View style={styles.moonPhase}>
          <FirstQuarter />
          <Text style={styles.moonPhaseText}>First Quarter</Text>
        </View>
      )
    } else if (value > 0.25 && value < 0.5) {
      return (
        <View style={styles.moonPhase}>
          <WaxingGibbous />
          <Text style={styles.moonPhaseText}>Waxing Gibbous</Text>
        </View>
      )
    } else if (value === 0.5) {
      return (
        <View style={styles.moonPhase}>
          <FullMoon />
          <Text style={styles.moonPhaseText}>Full moon</Text>
        </View>
      )
    } else if (value > 0.5 && value < 0.75) {
      return (
        <View style={styles.moonPhase}>
          <WaningGibbous />
          <Text style={styles.moonPhaseText}>Waning gibbous</Text>
        </View>
      )
    } else if (value === 0.75) {
      return (
        <View style={styles.moonPhase}>
        <ThirdQuarter />
        <Text style={styles.moonPhaseText}>Third Quarter</Text>
      </View>
      )
    } else if (value > 0.75 && value < 1) {
      return (
        <View style={styles.moonPhase}>
        <WaningCrescent />
        <Text style={styles.moonPhaseText}>Waning crescent</Text>
      </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.topContainer}>
        <Text style={styles.title}>Sun & moon</Text>
        {moonPhase(weather.daily[0].moon_phase)}
      </View>

      <View style={styles.middleContainer}>
        <Horizon 
          style={styles.horizon}
          moonPosition={moonPosition}
          sunPosition={sunPosition}
          sunOpacity={sunOpacity}
          moonOpacity={moonOpacity}
        />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.sun}>
          <Feather style={styles.icon} name='sun' size={22} color='#000' />
          <View>
            <Text>{dayjs(weather.daily[0].sunrise * 1000).format('HH:MM')} &#x2191;</Text>
            <Text>{dayjs(weather.daily[0].sunset * 1000).format('HH:MM')} &#x2193;</Text>
          </View>
        </View>
        
        <View style={styles.moon}>
          <Feather style={styles.icon} name='moon' size={22} color='#000'/>
          <View>
            <Text>{dayjs(weather.daily[0].moonrise * 1000).format('HH:MM')} &#x2191;</Text>
            <Text>{dayjs(weather.daily[0].moonset * 1000).format('HH:MM')} &#x2193;</Text>
          </View>
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
    marginHorizontal: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  icon: {
    paddingRight: 6
  },
  moonPhase: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingRight: 20, 
    paddingBottom: 20
  },
  moonPhaseText: {
    paddingLeft: 5
  },
  topContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  middleContainer: {
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingBottom: 16,
    marginHorizontal: 20
  },
  horizon: {
    alignItems:'center', 
    justifyContent:'center'
  },
  bottomContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginHorizontal: 20
  },
  sun: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  moon: {
    flexDirection: 'row', 
    alignItems: 'center'
  }
});