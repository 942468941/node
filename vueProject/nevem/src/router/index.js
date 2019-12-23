import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Add from '@/pages/Add'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Add',
      name: 'Add',
      component: Add
    }
  ]
})
