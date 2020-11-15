import http from '@/app/services/localHttpCommon.js'

const ENDPOINT = 'faqs'

class FaqService {
  all () {
    return http.get(ENDPOINT)
  }
  store (data) {
    return http.post(ENDPOINT, data)
  }
}

export default new FaqService()
