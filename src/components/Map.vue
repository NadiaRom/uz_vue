<template>
    <figure id="map">
        <l-map
            :zoom.sync="zoom"
            :center="center"
            :bounds="bounds"
            :min-zoom="6"
            :max-zoom="10"
            :max-bounds="bounds">

            <l-tile-layer
                :name="tileProvider.name"
                :visible="tileProvider.visible"
                :url="tileProvider.url"
                :attribution="tileProvider.attribution"
                layer-type="base"
            />

            <l-layer-group>
                <l-circle
                    v-for="m in dots"
                    :key="m.id"
                    :lat-lng="m.position"
                    :radius="m.r"
                    :weight="0.5"
                    color="#f77a52"
                    fill-color="#f77a52"
                    :fill-opacity="0.75"
                    :bubbling-mouse-events="true"
                    @click="setStation(m.id)"
                >
                    <l-tooltip v-if="!$store.state.isTouch">
                        <div class="map_tip">
                            <h4>{{ m.name }}</h4>
                            <p>{{ Math.round(m.kpas) }} пасажирів на добу</p>
                        </div>
                    </l-tooltip>
                    <l-popup v-if="$store.state.isTouch">
                        <div class="map_tip">
                            <h4>{{ m.name }}</h4>
                            <p>{{ Math.round(m.kpas) }} пасажирів на добу</p>
                            <button type="button"
                                @click="setStation(m.id)">
                                Детальніше
                            </button>
                        </div>
                    </l-popup>
                </l-circle>
            </l-layer-group>
        </l-map>
    </figure>
</template>

<script>
import 'vue-simple-suggest/lib/polyfills';
import VueSimpleSuggest from 'vue-simple-suggest';
import {LMap, LTileLayer, LLayerGroup, LCircle, LTooltip, LPopup} from 'vue2-leaflet';
import * as d3 from 'd3';
import { mapActions } from 'vuex'

export default {
    name: 'Map',
    components: {
        VueSimpleSuggest,
        LMap,
        LTileLayer,
        LLayerGroup,
        LTooltip,
        LPopup,
        LCircle,
    },
    data() {
        return {
            tileProvider: {
                name: 'Stamen',
                visible: true,
                attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png'
            },
            zoom: 6,
            subdomains: 'abcd',
            bounds: L.latLngBounds(
                    { 'lat': 44, 'lng': 21 },
                    { 'lat': 53, 'lng': 41 }
                ),
            scaleR: d3.scalePow()
                .exponent(0.5)
                .domain([100, 40000])
                .range([2500, 45000]),
            center: [48.85, 31.177],
        }
    },
    computed: {
        dots: function () {
            const that = this;
            return Object.values(this.$store.state.data)
                .map(d => {
                    return {
                        name: d.name,
                        id: d.id,
                        kpas: d.kpas,
                        position: {
                            lat: d.lat,
                            lng: d.lon,
                        },
                        r: that.scaleR(d.kpas),
                    };
                })
        },
    },

    methods: {
        ...mapActions([
            'setStation',
        ]),
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import "~leaflet/dist/leaflet.css";
</style>