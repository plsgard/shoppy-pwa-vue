import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import List from '@/components/List'
import Lists from '@/components/Lists'
import NewList from '@/components/NewList'
import Login from '@/components/Login'
import NotFound from '@/components/NotFound'

Vue.use(Router)

const router = new Router({
  // mode: 'history', can't work with service worker !!!
  routes: [
    {
      path: '/',
      redirect: { name: 'Lists' },
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
    },
    {
      path: '*',
      component: NotFound,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('setDrawer', false)
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
    if (to.name === 'Login' && store.getters.isAuthenticated) {
      next({ name: 'Lists' })
    } else {
      next() // make sure to always call next()!
    }
  }
})

export default router
