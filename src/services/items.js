export default class LocalList {
  constructor (listId) {
    this.localKey = 'items_' + listId
  }

  getAll () {
    return JSON.parse(localStorage.getItem(this.localKey))
  }

  setAll (data) {
    localStorage.setItem(this.localKey, JSON.stringify(data))
  }
}
