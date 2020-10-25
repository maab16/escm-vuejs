/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import * as types from './mutation-types'
import Order from '@/Modules/Order/order.model'
import OrderDetails from '@/Modules/OrderDetails/order-details.model'
import RequestDetails from '@/Modules/RequestDetails/request-details.model'
import History from '@/Modules/History/history.model'
import Comment from '@/Modules/Comment/comment.model'
import moment from 'moment'

const stateData = {
  orders: [],
  order: {},
  recentOrders: [],
  successfulOrders: 0,
  completedOrders: 0,
  slsOrders: 0
}
const mutations = {
  [types.SET_ORDERS] (state, orders) {
    state.orders = orders
  },
  [types.SET_ORDER] (state, payload) {
    state.orders.push(payload.order)
    state.order = payload.order
    localStorage.setItem('orders', JSON.stringify(payload.orders))
    localStorage.setItem('orderDetails', JSON.stringify(payload.orderDetails))
    localStorage.setItem('requestDetails', JSON.stringify(payload.requestDetails))
    localStorage.setItem('histories', JSON.stringify(payload.histories))
  },
  [types.UPDATE_ORDER] (state, payload) {
    localStorage.setItem('orders', JSON.stringify(payload.orders))
    localStorage.setItem('orderDetails', JSON.stringify(payload.orderDetails))
  },
  [types.UPDATE_ORDER_HISTORY] (state, histories) {
    localStorage.setItem('histories', JSON.stringify(histories))
  },
  [types.FETCH_ORDER] (state, order) {
    state.order = order
  },
  [types.SET_RECENT_ORDERS] (state, orders) {
    state.recentOrders = orders
  },
  [types.SET_SUCCESSFULL_ORDERS] (state, orders) {
    state.successfulOrders = orders
  },
  [types.SET_COMPLETED_ORDERS] (state, orders) {
    state.completedOrders = orders
  },
  [types.SET_SLS_ORDERS] (state, orders) {
    state.slsOrders = orders
  }
}
const actions = {
  setOrders ({commit, rootGetters}, option) {
    let user = rootGetters['user/user']
    let isManager = rootGetters['user/isManager']
    let isBuyingLead = rootGetters['user/isBuyingLead']
    let isInternalBuyer = rootGetters['user/isInternalBuyer']
    let isCustomer = rootGetters['user/isCustomer']
    let orders = []
    if (user) {
      Order.insert({data: JSON.parse(localStorage.getItem('orders'))})
      OrderDetails.insert({data: JSON.parse(localStorage.getItem('orderDetails'))})
      let query = Order.query().withAllRecursive()
      let userKey = ''
      if (isManager) {
        userKey = 'manager_id'
      } else if (isBuyingLead) {
        userKey = 'buying_lead_id'
      } else if (isInternalBuyer) {
        userKey = 'internal_buyer_id'
      } else if (isCustomer) {
        userKey = 'user_id'
      }
      if (userKey) {
        query.where(userKey, user.id)
        commit(types.SET_SUCCESSFULL_ORDERS, Order.query().where(userKey, user.id).where('status', 'successful').count())
        commit(types.SET_COMPLETED_ORDERS, Order.query().where(userKey, user.id).where('status', 'completed').count())
        commit(types.SET_SLS_ORDERS, Order.query().where(userKey, user.id).where('status', 'sls').count())
      }
      if (option.address) {
        query.where('address_id', option.address)
      }
      if (option.customer) {
        query.where('user_id', option.customer)
      }
      if (option.projectManager) {
        query.where('manager_id', option.manager)
      }
      if (option.buyingLead) {
        query.where('buying_lead_id', option.buyingLead)
      }
      if (option.internalBuyer) {
        query.where('internal_buyer_id', option.internalBuyer)
      }
      if (option.from) {
        query.where('created_at', (value) => value >= option.from)
      }
      if (option.to) {
        query.where('created_at', (value) => value <= option.to)
      }
      console.log(query)
      query.orderBy('updated_at', 'desc')
      orders = query.get()

      console.log(orders)

      commit(types.SET_ORDERS, orders)
    }
  },
  filterOrders ({commit, rootGetters}, option) {
    console.log(option)
    const user = rootGetters['user/user']
    if (user) {
      Order.insert({data: JSON.parse(localStorage.getItem('orders'))})
      OrderDetails.insert({data: JSON.parse(localStorage.getItem('orderDetails'))})
      let query = Order.query()
        .withAllRecursive()
        .where('user_id', user.id)
      if (option.from) {
        query.where('updated_at', (value) => value >= option.from)
      }
      if (option.to) {
        query.where('updated_at', (value) => value <= option.to)
      }
      query.orderBy('id', 'desc')
      query.orderBy('updated_at', 'desc')
      let orders = query.get()
      commit(types.SET_ORDERS, orders)
    }
  },
  makeOrder ({commit, rootGetters}, payload) {
    let orderDetails = localStorage.getItem('orderDetails') != null
      ? JSON.parse(localStorage.getItem('orderDetails'))
      : []
    let requestDetails = localStorage.getItem('requestDetails') != null
      ? JSON.parse(localStorage.getItem('requestDetails'))
      : []
    let orders = localStorage.getItem('orders') != null
      ? JSON.parse(localStorage.getItem('orders'))
      : []
    let histories = localStorage.getItem('histories') != null
      ? JSON.parse(localStorage.getItem('histories'))
      : []

    let user = rootGetters['user/user']
    if (user != null) {
      let orderId = Order.query().max('id') + 1
      let order = {
        id: orderId,
        user_id: user.id,
        buying_lead_id: user.organization.buying_lead_id,
        status: 'successful',
        address_id: rootGetters['cart/deliveryAddress'],
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
      }
      orders.push(order)

      let orderDetailsMaxId = OrderDetails.query().max('id')
      payload.onlineProducts.map(product => {
        orderDetails.push({
          id: ++orderDetailsMaxId,
          order_id: orderId,
          product_id: product.id,
          qty: product.qty,
          created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
          updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
        })
      })

      let requestDetailsMaxId = RequestDetails.query().max('id')
      payload.requestProducts.map(product => {
        requestDetails.push({
          id: ++requestDetailsMaxId,
          user_id: user.id,
          order_id: orderId,
          cas: product.cas,
          qty: product.qty,
          purity: product.purity,
          description: product.description,
          created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
          updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
        })
      })

      histories.push({
        id: History.query().max('id') > 0 ? History.query().max('id') + 1 : 1,
        order_id: orderId,
        user_id: user.id,
        message: 'Order placed',
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
      })

      commit(types.SET_ORDER, {
        order,
        orders,
        orderDetails,
        requestDetails,
        histories
      })

      return {success: true, id: orderId}
    }
    return {success: false, id: undefined}
  },
  async fetchOrderDetails ({commit}, id) {

    Order.insert({data: JSON.parse(localStorage.getItem('orders'))})
    OrderDetails.insert({data: JSON.parse(localStorage.getItem('orderDetails'))})
    RequestDetails.insert({data: JSON.parse(localStorage.getItem('requestDetails'))})
    History.insert({data: JSON.parse(localStorage.getItem('histories'))})
    Comment.insert({data: JSON.parse(localStorage.getItem('comments'))})
    let order = Order.query()
      .withAllRecursive()
      .with('comments', (query) => {
        query.orderBy('updated_at', 'desc')
      })
      .where('id', Number(id))
      .first()
    commit(types.FETCH_ORDER, order)
  },
  async setRecentOrders ({commit, rootGetters}) {
    let user = rootGetters['user/user']
    let isManager = rootGetters['user/isManager']
    let isBuyingLead = rootGetters['user/isBuyingLead']
    let isInternalBuyer = rootGetters['user/isInternalBuyer']
    let isCustomer = rootGetters['user/isCustomer']
    if (user) {
      Order.update({data: JSON.parse(localStorage.getItem('orders'))})
      OrderDetails.update({data: JSON.parse(localStorage.getItem('orderDetails'))})

      let orders = []
      let userKey = ''
      let query = Order.query().withAllRecursive()
      if (isManager) {
        userKey = 'manager_id'
      } else if (isBuyingLead) {
        userKey = 'buying_lead_id'
      } else if (isInternalBuyer) {
        userKey = 'internal_buyer_id'
      } else if (isCustomer) {
        userKey = 'user_id'
      }
      if (userKey) {
        query.where(userKey, user.id)
        commit(types.SET_SUCCESSFULL_ORDERS, Order.query().where(userKey, user.id).where('status', 'successful').count())
        commit(types.SET_COMPLETED_ORDERS, Order.query().where(userKey, user.id).where('status', 'completed').count())
        commit(types.SET_SLS_ORDERS, Order.query().where(userKey, user.id).where('status', 'sls').count())
      }
      query.orderBy('updated_at', 'desc')
      if (process.env.RECENT_ORDERS_LIMIT) {
        query.limit(process.env.RECENT_ORDERS_LIMIT)
      }
      orders = query.get()

      // orders = orders.sort(function (left, right) {
      //   return moment.utc(left.updated_at) < moment.utc(right.updated_at) ? 1 : moment.utc(left.updated_at) >  moment.utc(right.updated_at) ? -1 : 0
      //   // return moment.utc(left.updated_at).diff(moment.utc(right.updated_at))
      // }).slice(0, 5)

      commit(types.SET_RECENT_ORDERS, orders)
      return true
    }

    return false
  },
  async updateOrderDeatils ({commit, state}, products) {
    let order = state.order
    if (order) {
      let orderDetails = localStorage.getItem('orderDetails') != null
        ? JSON.parse(localStorage.getItem('orderDetails'))
        : []
      let orders = localStorage.getItem('orders') != null
        ? JSON.parse(localStorage.getItem('orders'))
        : []
      orderDetails = orderDetails.map(orderDetail => {
        products.forEach(product => {
          if (orderDetail.id == product.pivot.id) {
            orderDetail.qty = product.pivot.qty
            orderDetail.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
            order.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
          }
        })

        return orderDetail
      })
      orders = orders.map(item => {
        if (item.id == order.id) {
          return order
        }
        return item
      })
      commit(types.UPDATE_ORDER, {orders, orderDetails})
    }
  },
  async updateOrder ({commit}, orderData) {
    let orderDetails = localStorage.getItem('orderDetails') != null
      ? JSON.parse(localStorage.getItem('orderDetails'))
      : []
    let orders = localStorage.getItem('orders') != null
      ? JSON.parse(localStorage.getItem('orders'))
      : []
    orders = orders.map(order => {
      if (order.id === orderData.id) {
        order.manager_id = orderData.manager_id
        order.buying_lead_id = orderData.buying_lead_id
        order.internal_buyer_id = orderData.internal_buyer_id
      }
      return order
    })
    commit(types.UPDATE_ORDER, {orders, orderDetails})
  },
  async updateOrderHistory ({commit, rootGetters}, payload) {
    let histories = localStorage.getItem('histories') != null
      ? JSON.parse(localStorage.getItem('histories'))
      : []
    let user = rootGetters['user/user']
    if (user) {
      histories.push({
        id: History.query().max('id') > 0 ? History.query().max('id') + 1 : 1,
        order_id: payload.order.id,
        user_id: user.id,
        message: payload.message,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
      })

      commit(types.UPDATE_ORDER_HISTORY, histories)
    }
  }
}

const getters = {
  orders: (state) => state.orders,
  order: (state) => state.order,
  recentOrders: (state) => state.recentOrders,
  successfulOrders: (state) => state.successfulOrders,
  completedOrders: (state) => state.completedOrders,
  slsOrders: (state) => state.slsOrders,
  getMaxOrderId: (state) => {
    return Order.query().max('id')
  },
  getMaxOrderDetailsId: (state) => {
    return OrderDetails.query().max('id')
  }
}

export default {
  state: stateData,
  mutations,
  actions,
  getters
}
