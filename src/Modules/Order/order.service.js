import http, {storage} from '@/app/services/httpCommon.js'
// import axios from '@/app/services/order'
// import axios from 'axios'

const ENDPOINT = 'orders'

class OrderService {
  all () {
    return storage.get(ENDPOINT)
  }
  store (data) {
    return storage.post(ENDPOINT, data)
  }
  update (data) {
    return storage.put(ENDPOINT, data)
  }
  async createOrder (user, payload) {
    let response = await http.post('orders/', {user: user, payload: payload})
    return response.data
  }
  async getOrders (userKey, user, option = {}, limit = null) {
    let response = await http.get('orders', {
      params: {
        userKey: userKey,
        user: user,
        option: option,
        limit: limit
      }
    })
    return response.data
  }
  async getOrder (id) {
    let response = await http.get('orders/' + id)
    return response.data
  }
  async getInternalBuyers (id) {
    let response = await http.get('buying-lead/buyers/' + id)
    return response.data
  }
  async updateOrder (data, rootGetters) {
    let response = await http.put('orders/' + data.id, {
      id: data.id,
      user_id: data.user_id,
      manager_id: data.manager_id,
      buying_lead_id: data.buying_lead_id,
      internal_buyer_id: data.internal_buyer_id,
      address_id: data.address_id,
      currency: data.currency,
      status: data.status,
      created_at: data.created_at,
      updated_at: data.updated_at,
      products: data.products,
      requests: data.requests,
      user: rootGetters['user/user']
    })
    return response.data
  }
  async updateProductLines (user, data, products) {
    let response = await http.put('orders/lines/' + data.id, {
      id: data.id,
      user_id: data.user_id,
      manager_id: data.manager_id,
      buying_lead_id: data.buying_lead_id,
      internal_buyer_id: data.internal_buyer_id,
      address_id: data.address_id,
      currency: data.currency,
      status: data.status,
      created_at: data.created_at,
      updated_at: data.updated_at,
      products: products,
      user: user
    })
    return response.data
  }
}

export default new OrderService()
