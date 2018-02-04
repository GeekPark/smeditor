import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Donation from '@/views/Donation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/donation',
      name: 'Donation',
      component: Donation
    }
  ]
})
