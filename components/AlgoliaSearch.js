import React, { useState, useContext } from "react";
import { TextInput, TouchableOpacity, ScrollView, View, Text, StatusBar } from "react-native";
import PropTypes from "prop-types";
import {ALGOLIA_APPID, ALGOLIA_APPKEY} from '@env';

import algoliasearch from "algoliasearch/reactnative";

import WeatherContext from '../context/WeatherContext';

export default function AlgoliaSearch(props) {
  const [textSearch, setTextSearch] = useState('')
  const [search, setSearch] = useState(null)
        
  const { weather, setWeather, fetchWeather } = useContext(WeatherContext);

  // algoliasearch.initPlace("appID", "appKey")
  const places = algoliasearch.initPlaces({ALGOLIA_APPID}, {ALGOLIA_APPKEY});

  const handleSearchComplete = (props) => {
    setWeather((prevState) => ({
      ...prevState,
      city: props.item.locale_names[0],
      lat: props.item._geoloc.lat,
      log: props.item._geoloc.lng
    }))

    fetchWeather();
    
    setWeather((prevState) => ({
      ...prevState,
      search: false
    }))
  }

  
  const searchResults = (text) => {
    // Create an options object
    const finalOptions = {
      language: "default",
      type: "city",
      // hitsPerPage: "6",
    };

    // Add query item to options
    finalOptions.query = text;

    places
      .search(finalOptions)
      .then((res) => {
        setSearch(res)
        setTextSearch(text)

      })
      .catch((err) => {
        onSearchError(err);
      });
  }

  const onSearchError = async (err) => {
    if (props.onSearchError) {
      await props.onSearchError(err);
    }
  }
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Search..."
        placeholderTextColor={"#777"}
        onChangeText={searchResults}
        returnKeyType="search"
      />
      <ScrollView>
        {search &&
          search.hits.map((item, i) =>
          (<TouchableOpacity
            key={i + "item"}
            onPress={() => handleSearchComplete({item})}
          >
            {props.itemList(item, i, textSearch)}
          </TouchableOpacity>)
        )}
      </ScrollView>
    </View>
  );
}

AlgoliaSearch.defaultProps = {
  itemList: (item, i, textSearch) => {
    return (
      <View key={i + "search_result"}>
        <View style={styles.placesView}>
          <Text style={styles.placesCity}>
            {item.locale_names instanceof Array
              ? item.locale_names[0]
              : item.locale_names.default[0]}
          </Text>
          <Text style={styles.placesCountry}>
            {(typeof item.country === "string"
              ? item.country
              : item.country.default)}
          </Text>
        </View>
      </View>
    );
  },
};

AlgoliaSearch.propTypes = {
  appId: PropTypes.string,
  appKey: PropTypes.string,
  options: PropTypes.object,

  onSearchError: PropTypes.func,
  itemList: PropTypes.func,
};

const styles = {
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
  textInput: {
    backgroundColor: "#fff",
    color: "#000",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  locationStyle: {
    fontSize: 20,
  },
  cityStyle: {
    fontSize: 16,
  },

  placesView: {
    padding: 10
  },
  placesContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  placesCity: {
    fontSize: 16,
    fontWeight: "bold",
  },
  placesCountry: {
  },
};