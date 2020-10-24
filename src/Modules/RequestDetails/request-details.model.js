import { Model } from '@vuex-orm/core'
import User from '@/Modules/User/user.model'
import Order from '@/Modules/Order/order.model'
import moment from 'moment'

const date = moment().format('YYYY-MM-DD HH:mm:ss')

class RequestDetails extends Model {
  static fields () {
    return {
      id: this.uid(),
      user_id: this.attr(),
      order_id: this.attr(),
      cas: this.string(),
      qty: this.number(),
      purity: this.string(),
      description: this.string(),
      delivery_at: this.string(null).nullable(),
      created_at: this.string(date).nullable(),
      updated_at: this.string(date).nullable(),
      order: this.belongsTo(Order, 'order_id'),
      user: this.belongsTo(User, 'user_id')
    }
  }
}

RequestDetails.entity = 'request_details'

export default RequestDetails
