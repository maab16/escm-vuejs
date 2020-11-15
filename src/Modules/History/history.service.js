import http from '@/app/services/localHttpCommon.js'
import History from '@/Modules/History/history.model'
import moment from 'moment'

const ENDPOINT = 'histories'

class HistoryService {
  all () {
    return http.get(ENDPOINT)
  }
  store (data) {
    return http.post(ENDPOINT, data)
  }
  createOrderHistory (user, data) {
    let histories = this.all()
    histories.push({
      id: History.query().max('id') > 0 ? History.query().max('id') + 1 : 1,
      order_id: data.order.id,
      user_id: user.id,
      message: data.message,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    this.store(histories)
  }
  add (history) {
    let histories = this.all()
    histories.push(history)
    this.store(histories)
  }
}

export default new HistoryService()
