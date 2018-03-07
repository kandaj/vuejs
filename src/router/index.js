import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import GetFileDetails from '@/components/GetFileDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/get-file-details',
      name: 'GetFileDetails',
      component: GetFileDetails
    }
  ]
})
