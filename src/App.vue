<template>
  <main id="app">
    <Map/>
  </main>
</template>

<script>
import Map from './components/Map.vue'
import Yearly from './components/Yearly.vue'
import Weekday from './components/Weekday.vue'
import Hourly from './components/Hourly.vue'


export default {
  name: 'app',
  components: {
    Map,
    Yearly,
    Weekday,
    Hourly,
  }
}
</script>

<style lang="scss">
@import 'assets/style.scss';
</style>
