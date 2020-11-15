/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import Cookies from 'js-cookie'
import UserService from '@/Modules/User/user.service'
import * as types from './mutation-types'
// import NotificationService from '@/Modules/Notification/notification.service'

const stateData = {
  user: localStorage.getItem('user') != null
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  otp: Cookies.get('otp') !== undefined ? JSON.parse(Cookies.get('otp')) : null
}

const mutations = {
  [types.SET_USER] (state, payload) {
    state.user = payload
    // Cookies.set('user', JSON.stringify(payload), { expires: 365 })
    // localStorage.setItem('user', JSON.stringify(payload))
  },
  [types.SET_OTP] (state, payload) {
    state.otp = Number(payload)
    Cookies.remove('otp')
    Cookies.set('otp', payload, { expires: process.env.OTP_LIFETIME })
  },
  [types.LOGOUT] (state) {
    state.user = null
    state.otp = null

    localStorage.setItem('user', JSON.stringify(null))
    // Cookies.remove('user')
  }
}

const actions = {
  async sendOTP ({commit}, payload) {
    // let otp = Math.floor(1000 + Math.random() * 9000)
    const crypto = window.crypto || window.msCrypto
    var array = new Uint32Array(1)
    crypto.getRandomValues(array)
    const otp = array[0].toString().substr(0, 4)

    // let data = {
    //   email: payload.email,
    //   fname: payload.fname,
    //   lname: payload.lname,
    //   otp: otp,
    //   company_name: 'eSCM',
    //   reply_to: 'no-reply@escm.com'
    // }
    // NotificationService.send('otp', data)
    commit(types.SET_OTP, otp)
  },
  async createNewUser ({commit}, payload) {
    UserService.createUser(payload)
  },
  async loginInternalUser ({commit}, email) {
    return UserService.verifyInternalUser(email)
  },
  async logout ({commit}) {
    commit(types.LOGOUT)
  },
  setDefaultOTP ({commit}, payload) {
    commit(types.SET_OTP, null)
  },
  setUserData ({commit}, email) {
    let user = UserService.setUser(email)
    commit(types.SET_USER, user)
  }
}

const getters = {
  user: state => state.user,
  check: state => state.user !== null,
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
  getUserByEmail: (state) => (email) => {
    if (state.user.email != null) {
      return state.user
    }

    return UserService.getByEmail(email)
  },
  getUserByEmailWithOrganization: (state) => (email) => {
    return UserService.getByEmail(email)
  },
  getMaxId: (state) => {
    return UserService.getMaxId()
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
