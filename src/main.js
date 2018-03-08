// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import Axios from 'axios'

Vue.prototype.$http = Axios;

// Import the styles directly. (Or you could add them via script tags.)
import 'buefy/lib/buefy.css'

Vue.config.productionTip = false

Vue.use(Buefy,{
  defaultIconPack: 'fa'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
