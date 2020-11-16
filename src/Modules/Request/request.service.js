import http from '@/app/services/httpClient.js'

const ENDPOINT = 'requests'

class RequestService {
  async getRequests (userKey, user, option = {}, limit = null) {
    let response = await http.get(ENDPOINT, {
      params: {
        userKey: userKey,
        user: user,
        option: option,
        limit: limit
      }
    })
    return response.data
  }
}

export default new RequestService()
