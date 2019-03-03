import Vue from 'vue'
import Vuex from 'vuex'
import data from '@/assets/data/all_stations.json';

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
    activeStation: '',
    data: data,
    isTouch: false,
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
    }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
    setStation: ({ commit }, station) => commit('setStation', station),
    setTouch: ({ commit }, t) => commit('setTouch', t),
}

// getters are functions
const getters = {
    currentStation: state => (state.activeStation in state.data)
        ? state.data[state.activeStation]
        : state.data['2200001'], // Kyiv Main

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

//   stationPoints: state => {
//       return {
//         type: 'FeatureCollection',
//         features: Object.values(state.data)
//             .map(d => {
//                 return {
//                     type: 'Feature',
//                     geometry: {
//                         type: 'Point',
//                         coordinates: [d.lat, d.lon],
//                     },
//                     properties: {name: d.name, kpas: d.kpas},
//                 };
//             }),
//         };
//     },
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})