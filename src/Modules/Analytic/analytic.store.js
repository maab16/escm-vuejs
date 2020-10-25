/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import * as types from './mutation-types'
import User from '@/Modules/User/user.model'
import Order from '@/Modules/Order/order.model'
import Product from '@/Modules/Product/product.model'
import Organization from '@/Modules/Organization/organization.model'
import RequestDetails from '@/Modules/RequestDetails/request-details.model'
import moment from 'moment'

const stateData = {
  orders: [],
  popularProducts: [],
  getOrdersByMonth: [],
  getCompanyDistributionData: [],
  getUnavailableProductsByMonth: [],
  getUnavailableProducts: [],
  successfulOrders: [],
  slsOrders: [],
  completedOrders: [],
  pendingOrders: [],
  customerOrders: [],
  internalBuyerOrders: []
}
const mutations = {
  [types.SET_ANALYTIC_ORDERS] (state, orders) {
    state.orders = orders
  },
  [types.SET_POPULAR_PRODUCTS] (state, products) {
    state.popularProducts = products
  },
  [types.SET_ORDERS_BY_MONTH] (state, data) {
    state.getOrdersByMonth = data
  },
  [types.SET_DISTRIBUTION_DATA] (state, data) {
    state.getCompanyDistributionData = data
  },
  [types.SET_UNAVIALBLE_ORDERS_BY_MONTH] (state, data) {
    state.getUnavailableProductsByMonth = data
  },
  [types.SET_UNAVAILABLE_PRODUCTS] (state, requests) {
    state.getUnavailableProducts = requests
  },
  [types.SET_CUSTOMER_ORDERS] (state, customerOrders) {
    state.customerOrders = customerOrders
  },
  [types.SET_SUCCESSFUL_ORDERS] (state, orders) {
    state.successfulOrders = orders
  },
  [types.SET_SLS_ORDERS] (state, orders) {
    state.slsOrders = orders
  },
  [types.SET_COMPLETED_ORDERS] (state, orders) {
    state.completedOrders = orders
  },
  [types.SET_PENDING_ORDERS] (state, orders) {
    state.pendingOrders = orders
  },
  [types.SET_INTERNAL_BUYER_ORDERS_BY_MONTH] (state, orders) {
    state.internalBuyerOrders = orders
  }
}
const actions = {
  async setAnalyticOrders ({commit, rootGetters}) {
    let loggedUser = rootGetters['user/user']
    let isManager = rootGetters['user/isManager']
    let isBuyingLead = rootGetters['user/isBuyingLead']

    if (loggedUser) {
      let users = User.query().withAllRecursive().get()
      let customerOrders = []
      let query = Order.query().withAllRecursive()
      let userKey = ''
      if (isManager) {
        userKey = 'manager_id'
        query.where('manager_id', loggedUser.id)
      } else if (isBuyingLead) {
        userKey = 'buying_lead_id'
        query.where('buying_lead_id', loggedUser.id)
      }
      let orders = query.get()
      // let orders = {
      //   total: items.sort((order1, order2) => {
      //     return order1.total < order2.total ? 1 : order1.total > order2.total ? -1 : 0
      //   }),
      //   successful: items.map(order => {
      //     return order.status === 'successful' ? order : null
      //   }).filter(order => order),
      //   completed: items.map(order => {
      //     return order.status === 'completed' ? order : null
      //   }).filter(order => order),
      //   sls: items.map(order => {
      //     return order.status === 'sls' ? order : null
      //   }).filter(order => order),
      //   pending: items.map(order => {
      //     return order.status === 'pending' ? order : null
      //   }).filter(order => order)
      // }
      users.map(user => {
        let userOrders = user.orders.filter(order => {
          switch (userKey) {
            case 'buying_lead_id':
              return order.buying_lead_id === loggedUser.id ? order : null
            case 'manager_id':
              return order.manager_id === loggedUser.id ? order : null
            default:
              return order
          }
        })

        if (userOrders.length > 0) {
          customerOrders.push({
            name: user.fname + ' ' + user.lname,
            orders: userOrders,
            total: userOrders.length,
            successful: userOrders.filter(order => {
              if (isManager) {
                return (order.manager_id === loggedUser.id && order.status === 'successful') ? order : null
              } else if (isBuyingLead) {
                return (order.buying_lead_id === loggedUser.id && order.status === 'successful') ? order : null
              }
              return order.status === 'successful' ? order : null
            }),
            completed: userOrders.filter(order => {
              if (isManager) {
                return (order.manager_id === loggedUser.id && order.status === 'completed') ? order : null
              } else if (isBuyingLead) {
                return (order.buying_lead_id === loggedUser.id && order.status === 'completed') ? order : null
              }
              return order.status === 'completed' ? order : null
            }),
            sls: userOrders.filter(order => {
              if (isManager) {
                return (order.manager_id === loggedUser.id && order.status === 'sls') ? order : null
              } else if (isBuyingLead) {
                return (order.buying_lead_id === loggedUser.id && order.status === 'sls') ? order : null
              }
              return order.status === 'sls' ? order : null
            }),
            pending: RequestDetails
              .query()
              .withAllRecursive()
              .where('user_id', user.id)
              .get()
              .filter(orderDetail => {
                if (isManager) {
                  return (orderDetail.order.manager_id === loggedUser.id) ? orderDetail : null
                } else if (isBuyingLead) {
                  return (orderDetail.order.buying_lead_id === loggedUser.id) ? orderDetail : null
                }
                return orderDetail
              })
          })
        }
      })
      customerOrders = customerOrders.sort((order1, order2) => {
        return order1.total < order2.total ? 1 : order1.total > order2.total ? -1 : 0
      })
      commit(types.SET_ANALYTIC_ORDERS, orders)
      commit(types.SET_CUSTOMER_ORDERS, customerOrders)
    }
  },
  async setPopularProducts ({commit, rootGetters}) {
    let loggedUser = rootGetters['user/user']

    if (loggedUser) {
      let products = Product
        .query()
        .withAllRecursive()
        .get()
        .sort((product1, product2) => {
          return product1.orders.length < product2.orders.length
            ? 1 : product1.orders.length > product2.orders.length ? -1 : 0
        })
      commit(types.SET_POPULAR_PRODUCTS, products)
    }
  },
  async setOrdersByMonth ({commit, rootGetters}) {
    let loggedUser = rootGetters['user/user']
    let isManager = rootGetters['user/isManager']
    let isBuyingLead = rootGetters['user/isBuyingLead']

    if (loggedUser) {
      let data = []
      for (let i = 6; i >= 0; i--) {
        let firstDay = moment().subtract(i, 'months').date(1)
        let lastDay = moment().subtract((i - 1), 'months').date(0)
        let from = firstDay.format('YYYY-MM-DD HH:mm:ss')
        let to = lastDay.format('YYYY-MM-DD HH:mm:ss')
        let query = Order.query()
        if (isManager) {
          query.where('manager_id', loggedUser.id)
        } else if (isBuyingLead) {
          query.where('buying_lead_id', loggedUser.id)
        }
        let orders = query.where('created_at', (value) => value >= from)
          .where('created_at', (value) => value <= to)
          .get()
        let completed = orders.filter(order => order.status === 'completed')
        let sls = orders.filter(order => order.status === 'sls')
        data.push({
          month: firstDay.format("MMM'YY"),
          completed: completed,
          sls: sls
        })
      }
      commit(types.SET_ORDERS_BY_MONTH, data)
    }
  },
  async setCompanyDistributionData ({commit, rootGetters}) {
    let loggedUser = rootGetters['user/user']
    let isManager = rootGetters['user/isManager']
    let isBuyingLead = rootGetters['user/isBuyingLead']

    if (loggedUser) {
      let organizations = Organization.query().withAllRecursive().get()

      let data = []
      organizations.forEach(organization => {
        let total = 0
        organization.users.forEach(user => {
          let orders = user.orders.filter(order => {
            if (isManager) {
              return order.manager_id === loggedUser.id ? order : null
            } else if (isBuyingLead) {
              return order.buying_lead_id === loggedUser.id ? order : null
            }
            return order
          })
          total += orders.length
        })

        if (total > 0) {
          data.push({
            name: organization.name,
            total: total
          })
        }
      })
      commit(types.SET_DISTRIBUTION_DATA, data)
    }
  },
  async setUnavailableOrdersByMonth ({commit, rootGetters}) {
    let loggedUser = rootGetters['user/user']
    if (loggedUser) {
      let data = []
      for (let i = 6; i >= 0; i--) {
        let firstDay = moment().subtract(i, 'months').date(1)
        let lastDay = moment().subtract((i - 1), 'months').date(0)
        let from = firstDay.format('YYYY-MM-DD HH:mm:ss')
        let to = lastDay.format('YYYY-MM-DD HH:mm:ss')
        let orders = RequestDetails
          .query()
          .withAllRecursive()
          .where('created_at', (value) => value >= from)
          .where('created_at', (value) => value <= to)
          // .where('delivered_at', (value) => value != null)
          .get()
        data.push({
          month: firstDay.format("MMM'YY"),
          orders: orders.filter(orderDetail => {
            let isManager = rootGetters['user/isManager']
            let isBuyingLead = rootGetters['user/isBuyingLead']
            if (isManager) {
              return orderDetail.order.manager_id === loggedUser.id ? orderDetail : null
            } else if (isBuyingLead) {
              return orderDetail.order.buying_lead_id === loggedUser.id ? orderDetail : null
            }
            return orderDetail
          })
        })
      }
      commit(types.SET_UNAVIALBLE_ORDERS_BY_MONTH, data)
    }
  },
  async setInternalBuyerOrdersByMonth ({commit, rootGetters}) {
    let loggedUser = rootGetters['user/user']
    if (loggedUser) {
      let data = []
      let users = User.query().withAllRecursive().get().filter(user => {
        let isInternalBuyer = false
        user.roles.forEach(role => {
          if (role.slug === 'internal-buyer') {
            isInternalBuyer = true
          }
        })
        if (isInternalBuyer) {
          return user
        }
      })
      users.forEach(user => {
        data.push({
          name: user.fname + ' ' + user.lname,
          orders: user.ib_orders
        })
      })
      commit(types.SET_INTERNAL_BUYER_ORDERS_BY_MONTH, data)
    }
  },
  async setUnavailableProducts ({commit}) {
    let requests = RequestDetails.query().withAllRecursive().orderBy('updated_at', 'desc').get()
    commit(types.SET_UNAVAILABLE_PRODUCTS, requests)
  },
  async setOrdersByStatus ({commit, rootGetters}, {status, option}) {
    console.log(status)
    console.log(option)
    let loggedUser = rootGetters['user/user']
    let isManager = rootGetters['user/isManager']
    let isBuyingLead = rootGetters['user/isBuyingLead']

    if (loggedUser) {
      let query = Order.query().withAllRecursive()
      if (isManager) {
        query.where('manager_id', loggedUser.id)
      } else if (isBuyingLead) {
        query.where('buying_lead_id', loggedUser.id)
      }

      if (option.customer) {
        query.where('user_id', option.customer)
      }

      if (option.projectManager) {
        query.where('manager_id', option.projectManager)
      }

      if (option.buyingLead) {
        query.where('buying_lead_id', option.buyingLead)
      }

      if (option.internalBuyer) {
        query.where('internal_buyer_id', option.internalBuyer)
      }

      if (option.from) {
        query.where('created_at', (value) => value >= moment(option.from).format('YYYY-MM-DD HH:mm:ss'))
      }

      if (option.to) {
        query.where('created_at', (value) => value <= moment(option.to).format('YYYY-MM-DD HH:mm:ss'))
      }

      let orders = query.where('status', status).get()
      console.log(orders)
      let setter = 'SET_' + status.trim().toUpperCase() + '_ORDERS'
      console.log(setter)
      commit(types[setter], orders)
    }
  },
  async setSuccessfulOrders ({dispatch}, option = {}) {
    dispatch('setOrdersByStatus', {
      status: 'successful',
      option: option
    })
  },
  async setSlsOrders ({dispatch}, option = {}) {
    dispatch('setOrdersByStatus', {
      status: 'sls',
      option: option
    })
  },
  async setCompletedOrders ({dispatch}, option = {}) {
    dispatch('setOrdersByStatus', {
      status: 'completed',
      option: option
    })
  },
  async setPendingOrders ({commit, rootGetters}, option = {}) {
    let loggedUser = rootGetters['user/user']
    let isManager = rootGetters['user/isManager']
    let isBuyingLead = rootGetters['user/isBuyingLead']

    if (loggedUser) {
      let query = RequestDetails.query().withAllRecursive()
      if (option.customer) {
        query.where('user_id', option.customer)
      }
      if (option.from) {
        query.where('created_at', (value) => value >= moment(option.from).format('YYYY-MM-DD HH:mm:ss'))
      }

      if (option.to) {
        query.where('created_at', (value) => value <= moment(option.to).format('YYYY-MM-DD HH:mm:ss'))
      }
      let orders = query.get().filter(orderDetail => {
        if (isManager) {
          return orderDetail.order.manager_id === loggedUser.id ? orderDetail : null
        } else if (isBuyingLead) {
          return orderDetail.order.buying_lead_id === loggedUser.id ? orderDetail : null
        }
        return orderDetail
      })

      if (option.projectManager) {
        orders = orders.filter(orderDetail => {
          return orderDetail.order.manager_id === option.projectManager ? orderDetail : null
        })
      }

      if (option.buyingLead) {
        orders = orders.filter(orderDetail => {
          return orderDetail.order.buying_lead_id === option.buyingLead ? orderDetail : null
        })
      }
      if (option.internalBuyer) {
        orders = orders.filter(orderDetail => {
          return orderDetail.order.internal_buyer_id === option.internalBuyer ? orderDetail : null
        })
      }
      commit(types.SET_PENDING_ORDERS, orders)
    }
  }
}

const getters = {
  analyticOrders: (state) => state.orders,
  popularProducts: (state) => state.popularProducts,
  getOrdersByMonth: (state) => state.getOrdersByMonth,
  getCompanyDistributionData: (state) => state.getCompanyDistributionData,
  getUnavailableProductsByMonth: (state) => state.getUnavailableProductsByMonth,
  getInternalBuyerOrdersByMonth: (state) => state.internalBuyerOrders,
  getUnavailableProducts: (state) => state.getUnavailableProducts,
  customerOrders: (state) => state.customerOrders,
  successfulOrders: (state) => state.successfulOrders,
  slsOrders: (state) => state.slsOrders,
  completedOrders: (state) => state.completedOrders,
  pendingOrders: (state) => state.pendingOrders
}

export default {
  state: stateData,
  mutations,
  actions,
  getters
}
