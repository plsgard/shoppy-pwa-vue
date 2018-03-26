export default class LocalProfile {
  constructor () {
    this.localKey = 'profile'
  }

  get () {
    return JSON.parse(localStorage.getItem(this.localKey))
  }

  set (data) {
    localStorage.setItem(this.localKey, JSON.stringify(data))
  }
}
