import http from '@/app/services/httpClient.js'

const ENDPOINT = 'recent/updates'

class RecentUpdateService {
  async addRecentUpdate (user, data, type = 'comment') {
    let response = await http.post(ENDPOINT, { user, data, type })
    return response.data
  }
  async getRecentUpdates (user, userKey, option, limit = null) {
    let res = await http.get(ENDPOINT, { params: {user, userKey, option, limit} })
    return res.data
  }
}

export default new RecentUpdateService()
