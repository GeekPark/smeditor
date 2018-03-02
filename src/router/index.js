import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Donation from '@/views/Donation'
import Preview from '@/views/Preview'

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
      path: '/preview',
      name: 'Preview',
      component: Preview
    },
    {
      path: '/donation',
      name: 'Donation',
      component: Donation
    }
  ]
})
