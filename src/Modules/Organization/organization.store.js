/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import Organization from '@/Modules/Organization/organization.model'

const state = {
  organizations: null
}

const mutations = {}

const actions = {
  async setOrganization ({ commit, payload }, organization) {
    console.log(organization)
  }
}

const getters = {
  getOrganization: (state) => (organization) => {
    return Organization.query().where('email', organization.email).first()
  },
  getOrganizationIdByEmail: (state) => (email) => {
    return Organization.query().where('email', email).first().id
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
