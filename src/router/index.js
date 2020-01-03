import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/index'
import Home from '@/views/Home'
import Program from '@/views/vote/program'
import Guest from '@/views/vote/guest'
import ShowVotes from '@/views/vote/ShowVote'
import Systemconfig from '@/views/vote/systemconfig'

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
      redirect: '/program',
      component: Home,
      children:[
        {
          path: '/program',
          component: Program
        },
        {
          path: '/guest',
          component: Guest
        },
        {
          path: '/showVotes',
          component: ShowVotes
        },
        {
          path: '/systemconfig',
          component: Systemconfig
        }
      ]
    }
  ]
})