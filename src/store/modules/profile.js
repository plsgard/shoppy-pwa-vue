import apiService from '@/api/api.service.js'
import LocalProfileService from '@/services/profile'

let localProfileService = new LocalProfileService()
const state = {
  profile: localStorage.getItem('profile')
}

const getters = {
  profile: state => state.profile,
  currentUserId: state => state.profile.id
}

const actions = {
  getProfile ({ commit }) {
    let localProfile = localProfileService.get()
    if (localProfile === undefined || localProfile === null) {
      return apiService.getProfile().then(data => {
        commit('setProfile', data)
        localProfileService.set(data)
      })
    } else {
      return new Promise((resolve, reject) => {
        commit('setProfile', localProfile)
        resolve()
      })
    }
  }
}

const mutations = {
  setProfile (state, profile) {
    state.profile = profile
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
