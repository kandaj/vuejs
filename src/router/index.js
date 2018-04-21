import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import FileDetails from '@/components/pages/FileDetails'
import FileStatus from '@/components/pages/FileStatus'
import DacAuthorizedDownloaders from '@/components/stats/DacAuthorizedDownloaders'
import Login from '@/components/pages/Login'
import AccessDenied from '@/components/commons/AccessDenied'
import {_} from 'vue-underscore';

Vue.use(Router)

const routes = [
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
    component: FileStatus,
    meta: { requiresAuth: true , adminAuth:true}
  },
  {
    path: '/dac-authorized-downloaders',
    name: 'DacAuthorizedDownloaders',
    component: DacAuthorizedDownloaders,
    meta: { requiresAuth: true , adminAuth:true}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDenied
  }
]

const router = new Router({routes,mode:'history'})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('drupUser'))
    if(!authUser || !authUser.token) {
      next({name:'AccessDenied'})
    }
    else if(to.meta.adminAuth) {
      const authUser = JSON.parse(window.localStorage.getItem('drupUser'))
      console.log(authUser)
      console.log(authUser.data.roles)

      if( Object.values(authUser.data.roles).includes('administrator') ) {
        next()
      } else {
        next('/resident')
      }
    }
  }else {
    next()
  }
})

export default router;

