import Vue from 'vue'
import Vuex from 'vuex'
import data from '@/assets/data/all_stations.json';

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  activeStation: '',
  data: data,
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  setStation (state, station) {
    state.activeStation = station;
  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  setStation: ({ commit }, station) => commit('setStation', station),
}

// getters are functions
const getters = {
  currentStation: state => (state.activeStation in state.data)
    ? state.data[state.activeStation]
    : state.data['2200001'] // Kyiv Main
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})