<template>
  <main id="app">
    <Map/>
    <Daily/>
  </main>
</template>

<script>
import { mapActions } from 'vuex'
import Map from './components/Map.vue'
import Daily from './components/Daily.vue'
import Weekday from './components/Weekday.vue'
import Hourly from './components/Hourly.vue'


export default {
  name: 'app',
  components: {
    Map,
    Daily,
    Weekday,
    Hourly,
  },

  mounted() {
    const q = '(touch-enabled),(-webkit-touch-enabled),(-moz-touch-enabled),(-o-touch-enabled),(-ms-touch-enabled),(heartz)'
    if (('ontouchstart' in window)
      || window.DocumentTouch
      || window.matchMedia(q).matches
    ) {
      this.setTouch(true) }
  },

  methods: {
    ...mapActions([
      'setTouch',
    ])
  }
}
</script>

<style lang="scss">
@import 'assets/scss/style.scss';
</style>
