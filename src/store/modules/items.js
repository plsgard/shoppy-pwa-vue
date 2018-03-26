import apiService from '@/api/api.service.js'

const state = {
  items: [],
  listId: 0
}

const getters = {
  items: state => state.items,
  routeParams: (state, allGetters, rootState) => rootState.route.params
}

const actions = {
  getListItems ({ commit }, listId) {
    if (navigator.onLine) {
      return apiService.getItems(listId).then(data => {
        commit('setListItems', { listId, items: data })
        localStorage.setItem('items_' + listId, JSON.stringify(data))
      })
    } else {
      return new Promise((resolve, reject) => {
        commit('setListItems', JSON.parse(localStorage.getItem('items_' + listId)))
        resolve()
      })
    }
  },
  deleteItem ({ dispatch }, id) {
    return apiService.deleteItem(id).then(() => {
      dispatch('getListItems', getters.routeParams.id)
    })
  },
  renameItem ({ dispatch }, itemToUpdate) {
    return apiService.renameItem(itemToUpdate.id, itemToUpdate.updateName).then(() => {
      dispatch('getListItems', getters.routeParams.id)
    })
  },
  createItem ({ dispatch }, item) {
    return apiService.createItem(item).then(() => {
      dispatch('getListItems', getters.routeParams.id)
    })
  },
  pickItem ({ dispatch }, itemToPick) {
    return apiService.pickItem(itemToPick.id, itemToPick.toPick).then(() => {
      dispatch('getListItems', getters.routeParams.id)
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
