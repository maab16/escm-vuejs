import store from '../store'

export default (to, from, next) => {
  if (store.getters['user/check']) {
    next({ name: 'home' })
  } else {
    next()
  }
}
