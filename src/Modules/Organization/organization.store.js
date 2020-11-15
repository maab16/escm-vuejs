/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import OrganizationService from '@/Modules/Organization/organization.service'

const stateData = {}

const mutations = {}

const actions = {}

const getters = {
  getOrganization: (state) => (email) => {
    return OrganizationService.verifyOrganization(email)
  },
  getOrganizationIdByEmail: (state) => (email) => {
    return OrganizationService.getOrganizationIdByEmail(email)
  }
}

export default {
  state: stateData,
  mutations,
  actions,
  getters
}
