import Vue from 'vue'
import Vuex from 'vuex'
import itemsModule from './modules/items'
import apiService from '@/api/api.service.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  isAuthenticated: false,
  title: 'Shoppy'
}

const store = new Vuex.Store({
  modules: {
    itemsModule
  },
  strict: debug,
  state,
  getters: {
    isAuthenticated: (state) => {
      return state.isAuthenticated
    },
    title: (state) => {
      return state.title
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
    }
  },
  mutations: {
    logout (state) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('token', null)
        window.localStorage.setItem('tokenExpiration', null)
      }
      state.isAuthenticated = false
    },
    login (state, token) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('token', token.auth_token)
        window.localStorage.setItem('tokenExpiration', token.expires_in)
      }
      state.isAuthenticated = true
    }
  }
})

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function (event) {
    let expiration = window.localStorage.getItem('tokenExpiration')
    var unixTimestamp = new Date().getTime() / 1000
    if (expiration !== null && parseInt(expiration) - unixTimestamp > 0) {
      store.state.isAuthenticated = true
    }
  })
}

export default store
