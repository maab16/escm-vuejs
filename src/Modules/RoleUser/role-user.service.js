import http from '@/app/services/localHttpCommon'

const ENDPOINT = 'role_user'

class RoleUserService {
  all () {
    return http.get(ENDPOINT)
  }
  store (data) {
    return http.post(ENDPOINT, data)
  }
}

export default new RoleUserService()
