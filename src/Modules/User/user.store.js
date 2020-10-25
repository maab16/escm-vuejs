/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import Cookies from 'js-cookie'
import User from '@/Modules/User/user.model'
import * as types from './mutation-types'
import emailjs from 'emailjs-com'
emailjs.init('user_JwIHhf5su4OZ9muYnGiuQ')

const state = {
  user: localStorage.getItem('user') != null
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  otp: Cookies.get('otp') !== undefined ? JSON.parse(Cookies.get('otp')) : null
}

const mutations = {
  [types.SET_USER] (state, payload) {
    state.user = payload
    // Cookies.set('user', JSON.stringify(payload), { expires: 365 })
    localStorage.setItem('user', JSON.stringify(payload))
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

    // const email = await emailjs.send(
    //   'service_kk1pvue',
    //   'otp_template_6aymo19',
    //   data
    // )
    commit(types.SET_OTP, otp)
  },
  async createNewUser ({commit}, payload) {
    User.insert({
      data: payload
    })
    localStorage.setItem('users', JSON.stringify(User.query().all()))
  },
  async loginInternalUser ({commit}, email) {
    return User.query().where('email', email).exists() ? true : false
  },
  async logout ({commit}) {
    commit(types.LOGOUT)
  },
  setDefaultOTP ({commit}, payload) {
    commit(types.SET_OTP, null)
  },
  setUserData ({commit}, email) {
    let user = User.query().withAll().where('email', email).first()
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

    return User.query().where('email', email).first()
  },
  getUserByEmailWithOrganuization: (state) => (email) => {
    return User.query().with('organization').where('email', email).first()
  },
  getMaxId: (state) => {
    return User.query().max('id')
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
  state,
  mutations,
  actions,
  getters
}
