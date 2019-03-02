<template>
  <figure id="Map">
    <h1>{{ msg }}</h1>
  </figure>
</template>

<script>
import 'vue-simple-suggest/lib/polyfills';
import VueSimpleSuggest from 'vue-simple-suggest';
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';

export default {
  name: 'Map',
  components: {
      VueSimpleSuggest,
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>