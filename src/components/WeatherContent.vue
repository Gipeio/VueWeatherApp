<script setup>
import { ref, onMounted } from 'vue'
import WeatherBanner from '@/components/WeatherBanner.vue'
import CitySearch from '@/components/CitySearch.vue'
import CityList from '@/components/CityList.vue'
import axios from 'axios'
import { useCitiesStore } from '@/stores/cities'

const cityStore = useCitiesStore()

// ----
// Data
// ----

// Message to display on banner
const messageToDisplay = ref('')

// Message type (Info, Success, or Error) to display on banner
const messageType = ref('Info')

// API key from openweathermap.org
const openweathermapApiKey = ref('')

// ---------------
// Lifecycle Hooks
// ---------------
onMounted(() => {
  console.log('WeatherContent.vue: onMounted() called!')

  // Perform a check that the API key from openweathermap.org is defined
  if (import.meta.env.VITE_OPEN_WEATHER_API_KEY === undefined) {
    messageType.value = 'Error'
    messageToDisplay.value = 'Error! API Key needs to be loaded to use openweathermap.org!'
  } else {
    openweathermapApiKey.value = import.meta.env.VITE_OPEN_WEATHER_API_KEY
  }
})

// -------
// Methods
// -------
const searchCity = async (inputCity) => {
  var latitude = 0.0
  var longitude = 0.0
  var city = ''
  var state = ''
  var country = ''

  // GET request for retrieving the coordinates (latitude, longitude) for the specified city
  // using the Geocoding API from OpenWeather (https://openweathermap.org/api/geocoding-api) 
  try {
    const response = await axios.get('https://api.openweathermap.org/geo/1.0/direct?q=' + inputCity + '&APPID=' + openweathermapApiKey.value)

    // handle success
    console.log("Successfully retrieved coordinates for " + inputCity + ": " + response.data[0].lat + ", " + response.data[0].lon)

    // save the latitude/longitude, city name, state name, and country abbreviation
    latitude = response.data[0].lat
    longitude = response.data[0].lon
    city = response.data[0].name
    if ('state' in response.data[0]) { state = response.data[0].state }
    country = response.data[0].country
  } catch(error) {
    // handle error
    messageType.value = 'Error'
    messageToDisplay.value = 'ERROR! Unable to retrieve coordinates (latitude, longitude) for ' + inputCity + '!'
    console.log(error.message)
  }

  if (city !== '') {
    // GET request for retrieving the current weather data using the Current
    // Weather Data API from OpenWeather (https://openweathermap.org/current) 
    try {
      const response2 = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=imperial&APPID=' + openweathermapApiKey.value)

      // handle success
      console.log("Retrieved current temperature: " + response2.data.main.temp)
      console.log("and high/low: " + response2.data.main.temp_max + " / " + response2.data.main.temp_min)

      // save the weather data to the Pinia data store
      cityStore.addCity(
        city, state, country,
        response2.data.weather[0].main,
        response2.data.main.temp,
        response2.data.main.temp_max,
        response2.data.main.temp_min
      )
    } catch(error) {
      // handle error
      messageType.value = 'Error'
      messageToDisplay.value = 'ERROR! Unable to retrieve weather data for ' + inputCity + '!'
      console.log(error)
    }
  }
}

const clearMessage = () => {
  messageToDisplay.value = ''
  messageType.value = 'Info'
}
</script>

<template>
    <div class="content">
        <WeatherBanner class="banner" v-bind:bannerMessage="messageToDisplay" v-bind:bannerType="messageType" v-on:clear-banner="clearMessage"></WeatherBanner>
        <CitySearch class="weather-search" v-on:search-city="searchCity"></CitySearch>
        <CityList class="cities"></CityList>
    </div>
</template>

<style>
.content {
  margin: auto;
  max-width: 1080px;
  padding-bottom: 1em;
}
</style>
