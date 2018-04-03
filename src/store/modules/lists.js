import apiService from '@/api/api.service.js'
import LocalListService from '@/services/lists'

let localListService = new LocalListService()
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
        localListService.setAll(data)
      })
    } else {
      return new Promise((resolve, reject) => {
        commit('setLists', localListService.getAll())
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
  },
  duplicateList ({ dispatch }, listToDuplicate) {
    return apiService.duplicateList(listToDuplicate).then(() => {
      dispatch('getLists')
    })
  },
  shareList ({ dispatch }, listToShare) {
    return apiService.shareList(listToShare).then(() => {
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
