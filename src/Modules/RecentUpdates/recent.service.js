import http from '@/app/services/localHttpCommon.js'
import RecentUpdate from './recent.model'
import moment from 'moment'

const ENDPOINT = 'recentUpdates'

class RecentUpdateService {
  all () {
    return http.get(ENDPOINT)
  }
  store (data) {
    return http.post(ENDPOINT, data)
  }
  addRecentUpdate (user, data, type = 'comment') {
    let recents = this.all()
    recents.push({
      id: RecentUpdate.query().max('id') > 0 ? RecentUpdate.query().max('id') + 1 : 1,
      order_id: data.order_id,
      user_id: user.id,
      type: type,
      description: data.message,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    this.store(recents)
  }
  getRecentUpdates (user, userKey, option, limit = null) {
    RecentUpdate.insert({data: this.all()})

    let recentQuery = RecentUpdate.query()
      .with('user')
      .with('order', (query) => {
        query.where(userKey, user.id)
      })
      .orderBy('updated_at', 'desc')
    if (limit) {
      recentQuery.limit(limit)
    }
    let recents = recentQuery.get()
      .filter(recent => {
        if (recent.order) {
          return recent
        }
      })

    if (option.filter) {
      let search = option.filter.toLowerCase()
      recents = recents.filter(recent => {
        if (
          String(recent.order.id).indexOf(search) > -1 ||
          String(recent.type).toLowerCase().indexOf(search) > -1 ||
          String(recent.user.fname + recent.user.laname).toLowerCase().indexOf(search) > -1 ||
          String(recent.description).toLowerCase().indexOf(search) > -1 ||
          moment(recent.created_at).format('MMM DD, YYYY - HH:mm a').toLowerCase().indexOf(search) > -1
        ) {
          return recent
        }
      })
    }
    return recents
  }
}

export default new RecentUpdateService()
