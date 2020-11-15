import http from '@/app/services/localHttpCommon.js'
import Organization from '@/Modules/Organization/organization.model'

const ENDPOINT = 'organizations'

class OrganizationService {
  all () {
    return http.get(ENDPOINT)
  }
  store (data) {
    return http.post(ENDPOINT, data)
  }
  verifyOrganization (email) {
    return Organization.query().where('email', email).exists()
  }
  getOrganizationIdByEmail (email) {
    return Organization.query().where('email', email).first().id
  }
}

export default new OrganizationService()
