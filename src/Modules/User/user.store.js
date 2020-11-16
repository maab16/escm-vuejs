/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import Cookies from 'js-cookie'
import UserService from '@/Modules/User/user.service'
import * as types from './mutation-types'

const stateData = {
  user: localStorage.getItem('user') != null
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  otp: Cookies.get('otp') !== undefined ? JSON.parse(Cookies.get('otp')) : null,
  token: Cookies.get('token') ? Cookies.get('token') : null
}

const mutations = {
  [types.SET_USER] (state, payload) {
    state.user = payload
  },
  [types.SET_OTP] (state, payload) {
    state.otp = Number(payload)
    Cookies.remove('otp')
    Cookies.set('otp', payload, { expires: process.env.OTP_LIFETIME })
  },
  [types.SET_TOKEN] (state, token) {
    state.token = token
    Cookies.set('token', token, {expires: 365})
  },
  [types.LOGOUT] (state) {
    state.user = null
    state.otp = null
    state.token = null
    Cookies.remove('token')
  }
}

const actions = {
  async sendOTP ({commit}, email) {
    // let otp = Math.floor(1000 + Math.random() * 9000)
    const crypto = window.crypto || window.msCrypto
    var array = new Uint32Array(1)
    crypto.getRandomValues(array)
    const otp = array[0].toString().substr(0, 4)

    await UserService.sendOTP(email, otp)
    commit(types.SET_OTP, otp)
  },
  async createNewUser ({commit}, payload) {
    UserService.createUser(payload)
  },
  async loginInternalUser ({commit}, email) {
    let user = await UserService.verifyInternalUser(email)
    return user
  },
  async verifyCustomerUser ({commit}, paylaod) {
    let user = await UserService.verifyCustomerUser(paylaod)
    return user
  },
  async verifyUser ({commit, dispatch, getters}, payload) {
    let response = await UserService.login({
      email: payload.email,
      otp: payload.otp
    })
    commit(types.SET_USER, response.user)
    dispatch('saveToken', response.token)
  },
  saveToken ({commit}, token) {
    commit(types.SET_TOKEN, token)
  },
  async fetchUser ({commit}) {
    let user = await UserService.getUserByToken()
    if (!user) {
      commit(types.SET_TOKEN, null)
    }
    commit(types.SET_USER, user)
  },
  async logout ({commit}) {
    commit(types.LOGOUT)
  },
  setDefaultOTP ({commit}, payload) {
    commit(types.SET_OTP, null)
  }
}

const getters = {
  user: (state) => state.user,
  token: (state) => state.token,
  check: (state) => state.user !== null,
  hasRole: (state) => (slug) => {
    if (state.user) {
      let isRole = false
      state.user.roles.forEach(role => {
        if (role.slug === slug) {
          isRole = true
        }
      })

      return isRole
    }
    return false
  },
  isAdmin: (state) => {
    if (state.user) {
      let isRole = false
      state.user.roles.forEach(role => {
        if (role.slug === 'admin') {
          isRole = true
        }
      })

      return isRole
    }
    return false
  },
  isSupplierManager: (state) => {
    if (state.user) {
      let isRole = false
      state.user.roles.forEach(role => {
        if (role.slug === 'supplier-manager') {
          isRole = true
        }
      })

      return isRole
    }
    return false
  },
  isManager: (state) => {
    if (state.user) {
      let isRole = false
      state.user.roles.forEach(role => {
        if (role.slug === 'project-manager') {
          isRole = true
        }
      })

      return isRole
    }
    return false
  },
  isBuyingLead: (state) => {
    if (state.user) {
      let isRole = false
      state.user.roles.forEach(role => {
        if (role.slug === 'buying-lead') {
          isRole = true
        }
      })

      return isRole
    }
    return false
  },
  isInternalBuyer: (state) => {
    if (state.user) {
      let isRole = false
      state.user.roles.forEach(role => {
        if (role.slug === 'internal-buyer') {
          isRole = true
        }
      })

      return isRole
    }
    return false
  },
  isCustomer: (state) => {
    if (state.user) {
      let isRole = false
      state.user.roles.forEach(role => {
        if (role.slug === 'customer') {
          isRole = true
        }
      })

      return isRole
    }
    return false
  },
  getOTP: (state) => {
    return state.otp
  },
  getNameFromEmail: (state) => (email) => {
    return email.substring(0, email.lastIndexOf('@'))
  },
  getDomainFromEmail: (state) => (email) => {
    return email.substring(email.lastIndexOf('@') + 1)
  }
}

export default {
  state: stateData,
  mutations,
  actions,
  getters
}
