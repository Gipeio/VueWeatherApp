<script setup>
const props = defineProps({
  title: String
})
</script>

<template>
    <header>
        <h1>{{ title }}</h1>
    </header>
</template>

<style scoped>
header {
  margin: auto;
  text-align: center;
  margin-bottom: 2em;
}

header h1 {
  font-size: 2.5em;
}
</style>
