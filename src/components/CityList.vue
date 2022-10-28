<script setup>
import { useCitiesStore } from '@/stores/cities'

const store = useCitiesStore()
</script>

<template>
    <div>
        <div class="city-list">
            <div class="city-item" v-for="city in store.weatherData" v-bind:key="city.cityName">
                <div class="city-name">
                    <h2 v-if="city.stateName">{{ city.cityName }}, {{ city.stateName }}</h2>
                    <h2 v-else>{{ city.cityName }}</h2>
                    <h3>{{ city.countryAbbreviation }}</h3>
                </div>
                <div class="city-data">
                    <p><b>Weather Summary:</b> {{ city.weatherSummary }}</p>
                    <p><b>Current Temperature:</b> {{ city.currentTemperature }}&degF</p>
                    <p><b>High:</b> {{ city.dailyHigh }}&degF / <b>Low:</b> {{ city.dailyLow }}&degF</p>
                </div>
            </div>
        </div>

        <div class="clear-button" v-show="store.weatherData.length > 0">
          <button type="reset" v-on:click="store.clearAllCities">Clear Weather Data ({{ store.getNumberOfCities }})</button>
        </div>
    </div>
</template>

<style scoped>
.city-list {
  margin: 1em;
}

.city-item {
  width: 100%;
  padding: 1em;
  margin: 0.5em 0;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 8px rgba(102,119,136,.03), 0 1px 2px rgba(102,119,136,.3);
}

h2, h3 {
  color: #745fb5;
}

p {
  font-size: 1.2em;
  color: black;
}

p + p {
  margin-top: 0.5em;
}

.clear-button {
  display: flex;
  justify-content: center;
}
</style>
