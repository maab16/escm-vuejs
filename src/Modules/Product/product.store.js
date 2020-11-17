import Cookies from 'js-cookie'
import * as types from './mutation-types'
import ProductService from './product.service'

const stateData = {
  product: null,
  products: [],
  keywords: localStorage.getItem('product_keywords') != null
    ? JSON.parse(localStorage.getItem('product_keywords'))
    : [],
  advancedOptions: localStorage.getItem('product_advanced_options') != null
    ? JSON.parse(localStorage.getItem('product_advanced_options'))
    : {},
  search: [],
  regex: /([0-9]{2,7})-([0-9]{2})-[0-9]/,
  isCasNumber: false,
  currency: Cookies.get('currency') != null ? Cookies.get('currency') : 'inr',
  isSearch: false
}

const mutations = {
  [types.SET_PRODUCT] (state, products) {
    state.products = products
  },
  [types.SET_PRODUCT_SEARCH] (state, payload) {
    state.search = payload
  },
  [types.SET_PRODUCT_KEYWORDS] (state, keywords) {
    state.keywords = keywords
    localStorage.setItem('product_keywords', JSON.stringify(keywords))
  },
  [types.SET_PRODUCT_ADVANCED_OPTIONS] (state, options) {
    state.advancedOptions = options
    localStorage.setItem('product_advanced_options', JSON.stringify(options))
  },
  [types.SET_PRODUCT_CURRENCY] (state, currency) {
    state.currency = currency

    Cookies.remove('currency')
    Cookies.set('currency', currency, { expires: process.env.COOKIES_LIFETIME })
  },
  [types.SET_IS_SEARCH] (state, payload) {
    state.isSearch = payload
  }
}

const actions = {
  setCurrency ({commit}, currency) {
    commit(types.SET_PRODUCT_CURRENCY, currency)
  },
  setKeywords ({commit}, keywords) {
    commit(types.SET_PRODUCT_KEYWORDS, keywords)
  },
  setIsSearch ({commit}, isSearch = false) {
    commit(types.SET_IS_SEARCH, isSearch)
  },
  setAdvancedOptions ({commit}, options) {
    commit(types.SET_PRODUCT_ADVANCED_OPTIONS, options)
  },
  async setProducts ({commit}, payload) {
    commit(types.SET_PRODUCT, ProductService.getProducts(payload))
  },
  async searchKeywords ({commit}, payload) {
    let keywords = await ProductService.getSearchKeywords(payload)
    commit(types.SET_PRODUCT_SEARCH, keywords)
  },
  async advancedSearchProducts ({commit}, payload) {
    commit(types.SET_PRODUCT_SEARCH, await ProductService.getAdvancedSearchProducts(payload))
  }
}

const gettersData = {
  currency: state => state.currency,
  products: state => state.products,
  keywords: state => state.keywords,
  isSearch: state => state.isSearch,
  advancedOptions: state => state.advancedOptions,
  getSearchProducts: state => state.search,
  getCheckDigit: (state) => (payload) => {
    var match = payload.cas.match(payload.regex)
    var digits = (match[1] + match[2]).split('').reverse()
    var sum = 0

    for (var i = 0; i < digits.length; i++) {
      sum += (i + 1) * parseInt(digits[i])
    }

    return sum % 10
  },
  isCasNumber: (state, getters, dispatch) => (cas) => {
    if (!cas.match(state.regex)) {
      return false
    }

    let valid = getters.getCheckDigit({
      cas: cas,
      regex: state.regex
    })

    return valid === Number(cas.slice(-1))
  },
  getProductsByCas: (state) => (cas) => {
    return ProductService.getProductsByCas(cas)
  },
  getAdavacedOptions: (state) => (tags, option) => {
    return ProductService.getAdavacedOptions(tags, option)
  }
}

export default {
  state: stateData,
  mutations,
  actions,
  getters: gettersData
}
