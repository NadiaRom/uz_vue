<template>
    <figure id="Map">
        <l-map ref="Map"
            :zoom.sync="zoom"
            :center="center"
            :bounds="bounds"
            :min-zoom="10"
            :max-zoom="3">
            <l-tile-layer
                :name="tileProvider.name"
                :visible="tileProvider.visible"
                :url="tileProvider.url"
                :attribution="tileProvider.attribution"
                layer-type="base"/>

            <!-- <l-control-zoom :position="zoomPosition" /> -->
        </l-map>
    </figure>
</template>

<script>
import 'vue-simple-suggest/lib/polyfills';
import VueSimpleSuggest from 'vue-simple-suggest';
import {LMap, LTileLayer, LControlZoom} from 'vue2-leaflet';

export default {
    name: 'Map',
    components: {
        VueSimpleSuggest,
        LMap,
        LTileLayer,
        LControlZoom,
    },
    data() {
        return {
            tileProvider: {
                name: 'OSM',
                visible: true,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                url: 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
            },
            zoom: 8,
            bounds: L.latLngBounds(
                    { 'lat': 44.17, 'lng': 21.55 },
                    { 'lat': 52.72, 'lng': 40.49 }
                ),
        }
    },
    computed: {
        center: function() {
            const st = this.$store.getters.currentStation
            return [st.lat, st.lon];
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>