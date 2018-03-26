import apiService from '@/api/api.service.js'

const state = {
  lists: []
}

const getters = {
  lists: state => state.lists
}

const actions = {
  getLists ({ commit }) {
    if (navigator.onLine) {
      return apiService.getLists().then(data => {
        commit('setLists', data)
        localStorage.setItem('lists', JSON.stringify(data))
      })
    } else {
      return new Promise((resolve, reject) => {
        commit('setLists', JSON.parse(localStorage.getItem('lists')))
        resolve()
      })
    }
  },
  deleteList ({ dispatch }, id) {
    return apiService.deleteList(id).then(() => {
      dispatch('getLists')
    })
  },
  renameList ({ dispatch }, listToUpdate) {
    return apiService.renameList(listToUpdate).then(() => {
      dispatch('getLists')
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
