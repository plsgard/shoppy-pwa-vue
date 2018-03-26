import Vue from 'vue'
import Vuex from 'vuex'
import itemsModule from './modules/items'
import listsModule from './modules/lists'
import profileModule from './modules/profile'
import apiService from '@/api/api.service.js'
import router from '@/router'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  isAuthenticated: !!localStorage.getItem('token'),
  drawer: false
}

const store = new Vuex.Store({
  modules: {
    itemsModule,
    listsModule,
    profileModule
  },
  strict: debug,
  state,
  getters: {
    isAuthenticated: (state) => {
      return state.isAuthenticated
    },
    drawer: (state) => {
      return state.drawer
    }
  },
  actions: {
    logout (context) {
      context.commit('logout')
    },
    login (context, credentials) {
      return new Promise((resolve) => {
        apiService.login(credentials)
          .then((data) => {
            context.commit('login', data)
            resolve()
          })
          .catch(() => {
            window.alert('Could not login!')
          })
      })
    },
    setDrawer (context, newVal) {
      context.commit('setDrawer', newVal)
    }
  },
  mutations: {
    logout (state) {
      // localStorage.removeItem('token')
      // localStorage.removeItem('tokenExpiration')
      localStorage.clear()
      state.isAuthenticated = false
      router.push({ name: 'Login' })
    },
    login (state, token) {
      localStorage.setItem('token', token.auth_token)
      localStorage.setItem('tokenExpiration', new Date().getTime() / 1000 + token.expires_in)
      state.isAuthenticated = true
    },
    setDrawer: (state, newVal) => {
      state.drawer = newVal
    }
  }
})

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function (event) {
    if (state.isAuthenticated) {
      let expiration = localStorage.getItem('tokenExpiration')
      var unixTimestamp = new Date().getTime() / 1000
      if (!!expiration && parseInt(expiration) - unixTimestamp < 0) {
        store.dispatch('logout')
      }
    }
  })
}

export default store
