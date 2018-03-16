import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Hello from '@/components/Hello'
import List from '@/components/List'
import Lists from '@/components/Lists'
import NewList from '@/components/NewList'
import Login from '@/components/Login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      meta: { requiresAuth: true }
    },
    {
      path: '/lists/:id',
      name: 'List',
      component: List,
      meta: { requiresAuth: true }
    },
    {
      path: '/lists',
      name: 'Lists',
      component: Lists,
      meta: { requiresAuth: true }
    },
    {
      path: '/lists/new',
      name: 'NewList',
      component: NewList,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
