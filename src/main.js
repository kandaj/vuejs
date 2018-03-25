// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import {HTTP} from './common/http-common';
import Chartkick from 'chartkick'
import VueChartkick from 'vue-chartkick'
import Highcharts from 'highcharts'

window.Highcharts = Highcharts
Vue.use(VueChartkick, { Chartkick })

Vue.prototype.$http = HTTP;

// Import the styles directly. (Or you could add them via script tags.)
import 'buefy/lib/buefy.css'

Vue.config.productionTip = false

Vue.use(Buefy,{
  defaultIconPack: 'fa'
})

export const eventBus = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
