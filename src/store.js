import Vue from 'vue'
import Vuex from 'vuex'
import data from '@/assets/data/all_stations.json';
// import * as d3 from 'd3';

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
    activeStation: '2200001', // Kyiv Main
    data: data,
    isTouch: false,
    cols: {
        orange: '#f77a52',
        dark: '#332532',
        bgcol: '#f6f6f6',
        fontcol: '#555555',
    }
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
    setStation (state, station) {
        state.activeStation = station;
    },
    setTouch (state, t) {
        state.isTouch = t === true;
    },
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
    setStation: ({ commit }, station) => commit('setStation', station),
    setTouch: ({ commit }, t) => commit('setTouch', t),
}

// getters are functions
const getters = {
    currentStation: (state) => state.data[state.activeStation],

    stationPoints: state => Object.values(state.data)
        .map(d => {
            return {
                name: d.name,
                id: d.id,
                kpas: d.kpas,
                position: {
                    lat: d.lat,
                    lng: d.lon,
                },
            };
        }),
    
    maxDaily: state => d3.max([
        d3.max(state.data[state.activeStation].daily, d => d.departure),
        d3.max(state.data[state.activeStation].daily, d => d.arrival),
    ]),

}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})