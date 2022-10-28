<script setup>
import { computed } from 'vue'

const emit = defineEmits(['clear-banner'])

// ----
// Data
// ----
const props = defineProps({
  // Message to display on banner
  bannerMessage: String,
  // Banner Types: Info, Error, or Success
  bannerType: String
})

// -------------------
// Computed Properties
// -------------------
const bannerBackgroundColor = computed(() => {
  if (props.bannerType === 'Error') {
    return 'red'
  } else if (props.bannerType === 'Success') {
    return 'green'
  } else {
    return 'blue'
  }
})

// -------
// Methods
// -------
const clearBannerMessage = () => {
  emit('clear-banner')
}
</script>

<template>
  <div v-show="bannerMessage" v-bind:style="{ 'background-color': bannerBackgroundColor }">
    <span id="errorMessageClear" v-on:click="clearBannerMessage">Clear</span>
    <p>{{ bannerMessage }}</p>
  </div>
</template>

<style scoped>
div {
  width: 100%;
  display:inline-block;
  margin-bottom: 15px;
}

span, p {
  padding: 15px;
  color: white;
  width: auto;
}

div {
  float: left;
}

#errorMessageClear {
  float: right;
}

#errorMessageClear:hover {
  color: black;
  cursor: pointer;
}
</style>
