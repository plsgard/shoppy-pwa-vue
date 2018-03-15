import axios from 'axios'

axios.defaults.baseURL = 'https://shoppy-api.azurewebsites.net/api/v1'

axios.interceptors.request.use(function (config) {
  if (typeof window === 'undefined') {
    return config
  }
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

const appService = {
  getItems (listId) {
    return new Promise((resolve) => {
      axios.get(`/items?listId=${listId}`)
        .then(response => {
          resolve(response.data)
        })
    })
  },
  getLists () {
    return new Promise((resolve) => {
      axios.get('/lists')
        .then(response => {
          resolve(response.data)
        })
    })
  },
  getProfile () {
    return new Promise((resolve) => {
      axios.post('/accounts/me')
        .then(response => {
          resolve(response.data)
        })
    })
  },
  login (credentials) {
    return new Promise((resolve, reject) => {
      axios.post('/auth/token', credentials)
        .then(response => {
          resolve(response.data)
        }).catch(response => {
          reject(response.status)
        })
    })
  },
  createList (list) {
    return new Promise((resolve, reject) => {
      axios.post('/lists', list)
        .then(response => {
          resolve(response.data)
        }).catch(response => {
          reject(response.status)
        })
    })
  },
  createItem (item) {
    return new Promise((resolve, reject) => {
      axios.post('/items', item)
        .then(response => {
          resolve(response.data)
        }).catch(response => {
          reject(response.status)
        })
    })
  }
}

export default appService
