import 'es6-promise/auto'
import Vue from 'vue'
import App from './App.vue'
import VueTippy from 'vue-tippy'
import VueScrollTo from 'vue-scrollto'
import store from './store.js'

Vue.config.productionTip = false

Vue.use(VueTippy)
Vue.use(VueScrollTo)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
