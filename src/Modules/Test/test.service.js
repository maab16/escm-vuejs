import http from '@/app/services/localHttpCommon.js'

const ENDPOINT = 'tests'

class TestService {
  all () {
    return http.get(ENDPOINT)
  }
  store (data) {
    return http.post(ENDPOINT, data)
  }
}

export default new TestService()
