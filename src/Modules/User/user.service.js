import http from '@/app/services/httpClient.js'

const ENDPOINT = 'users'

class UserService {
  async verifyInternalUser (email) {
    let response = await http.get('internal/verify/' + email)
    return response.data
  }
  async verifyCustomerUser (payload) {
    let response = await http.get(ENDPOINT + '/verify/' + payload.email, { params: {organizationEmail: payload.organization_email} })
    return response.data
  }
  async sendOTP (email, otp) {
    let response = await http.post('/otp/send', {email, otp})
    return response.data
  }
  async createUser (data) {
    await http.post('/register', {data})
  }
  async login (data) {
    let response = await http.post('/login', {data})
    return response.data
  }
  async getUserByToken () {
    try {
      let response = await http.get(ENDPOINT + '/fetch')
      return response.data
    } catch (err) {
      window.toastr.error(err.message)
      return null
    }
  }
}

export default new UserService()
