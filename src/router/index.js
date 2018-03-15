import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import List from '@/components/List'
import NewList from '@/components/NewList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/lists/:id',
      name: 'lists',
      component: List
    },
    {
      path: '/lists/new',
      component: NewList
    }
  ]
})
