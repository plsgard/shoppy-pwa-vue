import apiService from '@/api/api.service.js'
const state = {
  items: [],
  listId: 0
}

// const inBrowser = typeof window !== 'undefined'
// const state = (inBrowser && window.__INITIAL_STATE__) ? window.__INITIAL_STATE__.postsModule : defaultState

const getters = {
  items: state => state.items
}

const actions = {
  getListItems (context, listId) {
    return apiService.getItems(listId).then(data => {
      context.commit('setListItems', { listId, items: data })
    })
  }
}

const mutations = {
  setListItems (state, list) {
    state.listId = list.listId
    state.items = list.items
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
