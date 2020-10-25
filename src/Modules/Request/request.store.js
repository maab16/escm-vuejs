/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import * as types from './mutation-types'
import RequestDetails from '../RequestDetails/request-details.model'

const stateData = {
  orders: []
}
const mutations = {
  [types.SET_REQUEST] (state, orders) {
    state.orders = orders
  }
}
const actions = {
  setOrders ({commit, rootGetters}) {
    let user = rootGetters['user/user']
    if (user != null) {
      RequestDetails.insert({data: JSON.parse(localStorage.getItem('requestDetails'))})
      let requests = RequestDetails.query()
        .with('user')
        .where('user_id', user.id)
        .orderBy('id', 'desc')
        .orderBy('updated_at', 'desc')
        .get()
      commit(types.SET_REQUEST, requests)
      return true
    }

    return false
  }
}

const getters = {
  orders: state => state.orders
}

export default {
  state: stateData,
  mutations,
  actions,
  getters
}
