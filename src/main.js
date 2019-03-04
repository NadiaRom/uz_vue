import 'es6-promise/auto'
import Vue from 'vue'
import App from './App.vue'
import VueTippy from 'vue-tippy'
import VueScrollTo from 'vue-scrollto'
import * as d3 from 'd3';
import store from './store.js'

window.d3 = d3;

Vue.config.productionTip = false

Vue.use(VueTippy)
Vue.use(VueScrollTo)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
