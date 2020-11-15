import http from '@/app/services/localHttpCommon.js'

const ENDPOINT = 'requestDetails'

class RequestDetailsService {
  all () {
    return http.get(ENDPOINT)
  }
  store (data) {
    return http.post(ENDPOINT, data)
  }
}

export default new RequestDetailsService()
