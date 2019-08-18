import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddFood from '@/components/AddFood'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-food',
      name: 'AddFood',
      component: AddFood
    },
  ]
})
