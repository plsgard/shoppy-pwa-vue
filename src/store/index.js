import Vue from 'vue'
import Vuex from 'vuex'
import itemsModule from './modules/items'
import listsModule from './modules/lists'
import apiService from '@/api/api.service.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  isAuthenticated: !!localStorage.getItem('token'),
  drawer: false
}

const store = new Vuex.Store({
  modules: {
    itemsModule,
    listsModule
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
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', null)
        localStorage.setItem('tokenExpiration', null)
      }
      // state.isAuthenticated = false
    },
    login (state, token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token.auth_token)
        localStorage.setItem('tokenExpiration', token.expires_in)
      }
      // state.isAuthenticated = true
    },
    setDrawer: (state, newVal) => {
      state.drawer = newVal
    }
  }
})

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function (event) {
    let expiration = window.localStorage.getItem('tokenExpiration')
    var unixTimestamp = new Date().getTime() / 1000
    if (expiration === null || parseInt(expiration) - unixTimestamp < 0) {
      store.dispatch('logout')
    }
  })
}

export default store
