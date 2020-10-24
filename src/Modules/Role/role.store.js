import * as types from './mutation-types'
import Role from './role.model'

const state = {
  roles: []
}
const mutations = {
  [types.FETCH_ROLES] (state, roles) {
    state.roles = roles
  }
}

const actions = {
  async fetchRoles ({commit}) {
    let roles = Role.query().withAll().get()
    commit(types.FETCH_ROLES, roles)
  }
}

const getters = {
  roles: state => state.roles
}

export default {
  state,
  mutations,
  actions,
  getters
}
