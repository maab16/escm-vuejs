import http from '@/app/services/localHttpCommon'
import Role from './role.model'

const ENDPOINT = 'roles'

class RoleService {
  all () {
    return http.get(ENDPOINT)
  }
  getRoles () {
    let roles = this.all()
    Role.insert({data: roles})
    return Role.query().withAll().get()
  }
}

export default new RoleService()
