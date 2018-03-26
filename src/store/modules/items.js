import apiService from '@/api/api.service.js'
import router from '@/router'
import LocalItemService from '@/services/items'

const state = {
  items: [],
  listId: 0
}

const getters = {
  items: state => state.items
}

const actions = {
  getListItems ({ commit }) {
    let listId = router.currentRoute.params.id
    let localItemService = new LocalItemService(listId)

    if (navigator.onLine) {
      return apiService.getItems(listId).then(data => {
        commit('setListItems', { listId, items: data })
        localItemService.setAll(data)
      })
    } else {
      return new Promise((resolve, reject) => {
        commit('setListItems', { listId, items: localItemService.getAll() })
        resolve()
      })
    }
  },
  deleteItem ({ dispatch }, id) {
    return apiService.deleteItem(id).then(() => {
      dispatch('getListItems')
    })
  },
  renameItem ({ dispatch }, itemToUpdate) {
    return apiService.renameItem(itemToUpdate.id, itemToUpdate.updateName).then(() => {
      dispatch('getListItems')
    })
  },
  createItem ({ dispatch }, item) {
    return apiService.createItem(item).then(() => {
      dispatch('getListItems')
    })
  },
  pickItem ({ dispatch }, itemToPick) {
    return apiService.pickItem(itemToPick.id, itemToPick.toPick).then(() => {
      dispatch('getListItems')
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
