import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import FileDetails from '@/components/pages/FileDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/file-details',
      name: 'FileDetails',
      component: FileDetails
    }
  ]
})
