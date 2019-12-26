import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/index'
import Home from '@/views/Home'
import Copywrite from '@/views/vote/copywrite'
import Guest from '@/views/vote/guest'

Vue.use(Router)
 
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      redirect: '/copywrite',
      component: Home,
      children:[
        {
          path: '/copywrite',
          component: Copywrite
        },
        {
          path: '/guest',
          component: Guest
        }
      ]
    }
  ]
})