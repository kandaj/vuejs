import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import FileDetails from '@/components/pages/FileDetails'
import FileStatus from '@/components/pages/FileStatus'
import Login from '@/components/pages/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    },
    {
      path: '/file-status',
      name: 'FileStatus',
      component: FileStatus
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
