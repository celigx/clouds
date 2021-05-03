import React from 'react';
import Svg, { Circle, Rect, G } from 'react-native-svg';

export const Horizon = ({ sunPosition, moonPosition, sunOpacity, moonOpacity }) => {
  return (
    <Svg width="100%" height="35" viewBox="0 0 450 35" fill="none">
      <Rect id="line" y="13" width="100%" height="10" rx="5" fill="#DDD"/>
      <G x={sunPosition} opacity={sunOpacity} id="sun">
        <Circle cx="17.5" cy="17.5" r="17.5" fill="#FFD651"/>
      </G>
      <G x={moonPosition} opacity={moonOpacity} id="moon" >
        <Circle cx="17.5" cy="17.5" r="17.5" fill="#8F67FC"/>
        <Circle cx="23" cy="11" r="4" fill="white"/>
        <Circle cx="18" cy="21" r="2" fill="white"/>
        <Circle cx="27.5" cy="25.5" r="1.5" fill="white"/>
        <Circle cx="6" cy="23" r="1" fill="white"/>
        <Circle cx="11" cy="10" r="1" fill="white"/>
      </G>
    </Svg>
  )
}