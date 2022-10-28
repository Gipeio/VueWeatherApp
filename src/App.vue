<template>
    <div class="container">
        <WeatherHeader class="header" v-bind:title="title"></WeatherHeader>
        <WeatherContent class="content"></WeatherContent>
        <WeatherFooter class="footer">
            <template v-slot:message>Vue Weather App from TestDriven.io Blog</template>
            <template v-slot:link><a href="https://testdriven.io">TestDriven.io</a></template>
        </WeatherFooter>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import WeatherFooter from '@/components/WeatherFooter.vue'
import WeatherContent from '@/components/WeatherContent.vue'
import WeatherHeader from '@/components/WeatherHeader.vue'

// ----
// Data
// ----

// Title of the application
const title = ref('Vue Weather App')
</script>

<style>
@import './assets/base.css';

.container {
  margin: auto;
}
</style>
