import apiService from '@/api/api.service.js'
const state = {
  lists: []
}

// const inBrowser = typeof window !== 'undefined'
// const state = (inBrowser && window.__INITIAL_STATE__) ? window.__INITIAL_STATE__.postsModule : defaultState

const getters = {
  lists: state => state.lists
}

const actions = {
  getLists (context) {
    return apiService.getLists().then(data => {
      context.commit('setLists', data)
    })
  }
}

const mutations = {
  setLists (state, lists) {
    state.lists = lists
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
