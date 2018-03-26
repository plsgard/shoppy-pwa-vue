export default class LocalList {
  constructor () {
    this.localKey = 'lists'
  }

  getAll () {
    return JSON.parse(localStorage.getItem(this.localKey))
  }

  setAll (data) {
    localStorage.setItem(this.localKey, JSON.stringify(data))
  }
}
