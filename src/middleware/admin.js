import store from '../store'

export default (to, from, next) => {
  let user = store.getters['user/user']
  if (user) {
    let isRole = false
    for (let role of user.roles) {
      if (role.slug === 'admin' || role.slug === 'super-admin') {
        isRole = true
      }
    }

    if (!isRole) {
      next({ name: 'home' })
    } else {
      next()
    }
  } else {
    next({ name: 'login' })
  }
}
