/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import * as types from './mutation-types'
import Address from '@/Modules/User/address.model'

const state = {
  carts: localStorage.getItem('carts') != null
    ? JSON.parse(localStorage.getItem('carts'))
    : [],
  requests: localStorage.getItem('request_carts') != null
    ? JSON.parse(localStorage.getItem('request_carts'))
    : [],
  checkList: localStorage.getItem('check_list') != null
    ? JSON.parse(localStorage.getItem('check_list'))
    : [],
  requestList: localStorage.getItem('request_list') != null
    ? JSON.parse(localStorage.getItem('request_list'))
    : [],
  total: localStorage.getItem('total_carts') != null
    ? JSON.parse(localStorage.getItem('total_carts'))
    : 0,
  deliveryAddress: null,
  addresses: []
}
const mutations = {
  [types.SET_CART] (state, carts) {
    state.carts = carts
    localStorage.setItem('carts', JSON.stringify(carts))
  },
  [types.SET_CART_REQUEST] (state, requests) {
    state.requests = requests
    localStorage.setItem('request_carts', JSON.stringify(requests))
  },
  [types.SET_TOTAL_CART] (state, total) {
    state.total = total
    localStorage.setItem('total_carts', total)
  },
  [types.REMOVE_ALL_CART] (state, payload) {
    state.carts = []
    state.requests = []
    state.total = 0
    localStorage.setItem('carts', JSON.stringify([]))
    localStorage.setItem('request_carts', JSON.stringify([]))
    localStorage.setItem('check_list', JSON.stringify([]))
    localStorage.setItem('request_list', JSON.stringify([]))
    localStorage.setItem('total_carts', 0)
  },
  [types.SET_CHECK_LIST] (state, products) {
    state.checkList = products
    localStorage.setItem('check_list', JSON.stringify(products))
  },
  [types.SET_REQUEST_LIST] (state, products) {
    state.requestList = products
    localStorage.setItem('request_list', JSON.stringify(products))
  },
  [types.SET_DELIVERY_ADDRESS] (state, address) {
    state.deliveryAddress = address
  },
  [types.SET_DELIVERY_ADDRESSES] (state, addresses) {
    state.addresses = addresses
  }
}
const actions = {
  addCart ({commit, state}, item) {
    let carts = state.carts
    let total = parseInt(state.total)
    let isDirty = false
    carts = carts.map(cart => {
      if (cart.id === item.id) {
        cart.qty = parseInt(cart.qty) + 1
        isDirty = true
      }
      return cart
    })
    if (!isDirty) {
      total++
      carts.push(item)
      commit(types.SET_TOTAL_CART, total)
    }
    commit(types.SET_CART, carts)
  },
  addRequest ({commit, state}, item) {
    let requests = state.requests
    let total = parseInt(state.total)
    let isDirty = false
    requests = requests.map(request => {
      if (request.id === item.id) {
        request.qty = parseInt(request.qty) + 1
        isDirty = true
      }
      return request
    })
    if (!isDirty) {
      total++
      requests.push(item)
      commit(types.SET_TOTAL_CART, total)
    }
    commit(types.SET_CART_REQUEST, requests)
  },
  setCheckList ({commit}, payload) {
    commit(types.SET_CHECK_LIST, payload)
  },
  setOnlyRequestList ({commit}, payload) {
    commit(types.SET_REQUEST_LIST, payload)
  },
  removeCart ({commit, state}, item) {
    let carts = localStorage.getItem('carts') != null
      ? JSON.parse(localStorage.getItem('carts'))
      : []
    let total = localStorage.getItem('total_carts') != null
      ? JSON.parse(localStorage.getItem('total_carts'))
      : 0

    carts = carts.filter(cart => {
      if (cart.id === item.id) {
        if (total > 0) {
          total--
          commit(types.SET_TOTAL_CART, total)
        }
        return
      }
      return cart
    })

    commit(types.SET_CART, carts)
  },
  removeRequestCart ({commit, state}, item) {
    let requests = localStorage.getItem('request_carts') != null
      ? JSON.parse(localStorage.getItem('request_carts'))
      : []
    let total = localStorage.getItem('total_carts') != null
      ? JSON.parse(localStorage.getItem('total_carts'))
      : 0

    requests = requests.filter(cart => {
      if (cart.id === item.id) {
        if (total > 0) {
          total--
          commit(types.SET_TOTAL_CART, total)
        }
        return
      }

      return cart
    })

    commit(types.SET_CART_REQUEST, requests)
  },
  removeAllCart ({commit}, payload) {
    commit(types.REMOVE_ALL_CART, payload)
  },
  setDeliveryAddresses ({commit, rootGetters}) {
    let addresses = Address.all()
    commit(types.SET_DELIVERY_ADDRESSES, addresses)
  },
  setDeliveryAddress ({commit}, address) {
    commit(types.SET_DELIVERY_ADDRESS, address)
  },
  updateCart ({commit}, item) {
    let carts = state.carts
    carts = carts.map(cart => {
      if (cart.id == item.id) {
        return item
      }
      return cart
    })
    commit(types.SET_CART, carts)
  }
}

const getters = {
  carts: state => state.carts,
  requests: state => state.requests != null ? state.requests : [],
  checkList: state => state.checkList,
  requestList: state => state.requestList,
  total: state => state.total,
  addresses: state => state.addresses,
  deliveryAddress: state => state.deliveryAddress,
  // isCartItem: (state) => (payload) => {
  //   let carts = state.carts
  //   carts = carts.filter(cart => {
  //     if (cart.id === payload) {
  //       return cart
  //     }
  //   })
  //   return carts.length > 0
  // },
  // isRequestItem: (state) => (payload) => {
  //   let requests = state.requests
  //   requests = requests.filter(request => {
  //     if (request.id === payload) {
  //       return request
  //     }
  //   })
  //   return requests.length > 0
  // }
}

export default {
  state,
  mutations,
  actions,
  getters
}
