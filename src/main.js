// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {HTTP, HTTP_WITH_CREDENTIALS} from './assets/axios/http-common'
import Chartkick from 'chartkick'
import VueChartkick from 'vue-chartkick'
import Highcharts from 'highcharts'
import {store} from './store/index'
import underscore from 'vue-underscore'
import VueCookies from 'vue-cookies'
import BootstrapVue from 'bootstrap-vue'
import VueGoodTable from 'vue-good-table'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-good-table/dist/vue-good-table.css'

window.Highcharts = Highcharts

Vue.use(VueChartkick, { Chartkick })

Vue.use(underscore)

Vue.use(VueCookies)

Vue.use(BootstrapVue)

Vue.use(VueGoodTable)

Vue.prototype.$http = HTTP

Vue.prototype.$httpWC = HTTP_WITH_CREDENTIALS

Vue.config.productionTip = false


export const eventBus = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
