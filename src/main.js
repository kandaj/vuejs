// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import {HTTP} from './assets/axios/http-common'
import Chartkick from 'chartkick'
import VueChartkick from 'vue-chartkick'
import Highcharts from 'highcharts'
// import '../node_modules/ebi-framework/css/ebi-global.min.css'
// import '../node_modules/ebi-framework/css/theme-ebi-industry.css'
// import '../node_modules/ebi-framework/js/script.min'
// import 'buefy/lib/buefy.css'
// import '../static/ega-archive/css/jquery-ui-1.10.4.custom.css'
// import '../static/ega-archive/css/bootstrap.css'
// import '../static/ega-archive/css//bootstrap-responsive.css'
// import '../static/ega-archive/css/font-awesome.min.css'
// import '../static/ega-archive/css/jquery.bxslider.css'
// import '../static/ega-archive/css/style.css'
// import '../static/ega-archive/css/cookiecuttr.css'

Vue.component('b-table', Buefy.Table)

window.Highcharts = Highcharts

Vue.use(VueChartkick, { Chartkick })

Vue.prototype.$http = HTTP

Vue.config.productionTip = false

// Vue.use(Buefy,{
//   defaultIconPack: 'fa'
// })

export const eventBus = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
