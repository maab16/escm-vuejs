import http from '@/app/services/localHttpCommon.js'
// import emailjs from 'emailjs-com'
// emailjs.init('user_JwIHhf5su4OZ9muYnGiuQ')

const ENDPOINT = 'notifications'

class NotificationService {
  all () {
    return http.get(ENDPOINT)
  }
  store (data) {
    return http.post(ENDPOINT, data)
  }
  async send (type, data) {
    // let template = ''
    // switch (type) {
    //   case 'otp':
    //     template = 'otp_template_6aymo19'
    //     break
    //   case 'general_notification':
    //     template = 'general_notification'
    //     break
    // }
    // await emailjs.send(
    //   'service_kk1pvue',
    //   template,
    //   data
    // )
  }
}

export default new NotificationService()
