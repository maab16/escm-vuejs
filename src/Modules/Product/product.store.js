import Cookies from 'js-cookie'
import * as types from './mutation-types'
import Product from '@/Modules/Product/product.model'

const state = {
  product: null,
  products: localStorage.getItem('products') != null
    ? JSON.parse(localStorage.getItem('products'))
    : [],
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
  async searchProducts ({commit}, payload) {
    const query = Product
      .query()
    if (payload !== null && payload.length > 0) {
      query.orWhere('name', (name) => name.toLowerCase().indexOf(payload.toLowerCase()) > -1)
      query.orWhere('cas', (cas) => cas.toLowerCase().indexOf(payload.toLowerCase()) > -1)
    }
    if (process.env.SEARCH_LIMIT !== null) {
      query.limit(process.env.SEARCH_LIMIT)
    }

    const products = query.get()

    commit(types.SET_PRODUCT_SEARCH, products)
  },
  async advancedSearchProducts ({commit}, payload) {
    const options = payload.options
    const tags = payload.tags
    const orderBy = payload.orderBy
    const orderDirection = payload.orderDirection != null ? payload.orderDirection : 'desc'

    const query = Product.query()
    if (tags.length > 0) {
      tags.map(tag => {
        if (tag !== null && tag.length > 0) {
          query.orWhere('cas', (value) => value.indexOf(tag) > -1)
        }
      })
      if (orderBy != null) {
        query.orderBy(orderBy, orderDirection)
      }
      // if (options.supplier != null) {
      //   query.search(options.supplier, {
      //     caseSensitive: false,
      //     threshold: 0,
      //     keys: ['supplier']
      //   })
      // }
      // if (options.warehouse != null) {
      //   query.search(options.warehouse, {
      //     caseSensitive: false,
      //     threshold: 0,
      //     keys: ['warehouse']
      //   })
      // }
      // if (options.packsize != null) {
      //   query.search(options.packsize, {
      //     caseSensitive: false,
      //     threshold: 0,
      //     keys: ['packsize']
      //   })
      // }
      // if (options.purity != null) {
      //   query.search(options.purity, {
      //     caseSensitive: false,
      //     threshold: 0,
      //     keys: ['purity']
      //   })
      // }
      // if (options.delivery != null) {
      //   query.search(options.delivery, {
      //     caseSensitive: false,
      //     threshold: 0,
      //     keys: ['delivery']
      //   })
      // }

      if (process.env.SEARCH_LIMIT !== null) {
        // query.limit(process.env.SEARCH_LIMIT)
      }

      let products = query.get()

      if (options.purity != null) {
        let search = options.purity.toLowerCase().trim()
        products = products.filter(product => {
          let purity = product.purity.toLowerCase().trim()
          if (purity === search) {
            return product
          }
        })
      }

      if (options.qty != null) {
        products = products.filter(product => {
          if (product.availability >= options.qty) {
            product.qty = options.qty
            return product
          }
        })
      }

      if (options.packsize != null) {
        let search = options.packsize.toLowerCase().trim()
        products = products.filter(product => {
          let packsize = product.packsize.toLowerCase().trim()
          if (packsize === search) {
            return product
          }
        })
      }

      if (options.supplier != null) {
        let search = options.supplier.toLowerCase().trim()
        products = products.filter(product => {
          let supplier = product.supplier.toLowerCase().trim()
          if (supplier.indexOf(search) > -1) {
            return product
          }
        })
      }

      if (options.warehouse != null) {
        let search = options.warehouse.toLowerCase().trim()
        products = products.filter(product => {
          let warehouse = product.warehouse.toLowerCase().trim()
          if (warehouse.indexOf(search) > -1) {
            return product
          }
        })
      }

      if (options.delivery != null) {
        let search = options.delivery.toLowerCase().trim()
        products = products.filter(product => {
          let delivery = product.delivery.toLowerCase().trim()
          if (delivery.indexOf(search) > -1) {
            return product
          }
        })
      }

      commit(types.SET_PRODUCT_SEARCH, products)
    }
  }
}

const getters = {
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
    return Product
      .query()
      .where('cas', cas)
      .get()
  },
  getAdavacedOptions: (state) => (tags, option) => {
    let purities = []
    let quantities = []
    let packsizes = []
    let suppliers = []
    let warehouses = []
    let deliveries = []

    if (tags.length > 0) {
      tags.forEach(tag => {
        let query = Product.query().where('cas', tag)

        if (option.purity != null) {
          query.where('purity', option.purity)
        }

        if (option.qty != null) {
          query.where('qty', option.qty)
        }

        if (option.packsize != null) {
          query.where('packsize', option.packsize)
        }

        if (option.supplier != null) {
          query.where('supplier', option.supplier)
        }

        if (option.warehouse != null) {
          query.where('warehouse', option.warehouse)
        }

        if (option.delivery != null) {
          query.where('delivery', option.delivery)
        }

        let products = query.get()

        if (products.length > 0) {
          products.map(product => {
            purities.push(product.purity)
            if (product.availability > 0) {
              quantities.push(product.availability)
            }
            packsizes.push(product.packsize)
            suppliers.push(product.supplier)
            warehouses.push(product.warehouse)
            deliveries.push(product.delivery)
          })
        }
      })
    }
    purities = purities.filter((value, index, self) => {
      return self.indexOf(value) === index
    })
    quantities = quantities.filter((value, index, self) => {
      return self.indexOf(value) === index
    }).sort()
    packsizes = packsizes.filter((value, index, self) => {
      return self.indexOf(value) === index
    })
    suppliers = suppliers.filter((value, index, self) => {
      return self.indexOf(value) === index
    })
    warehouses = warehouses.filter((value, index, self) => {
      return self.indexOf(value) === index
    })
    deliveries = deliveries.filter((value, index, self) => {
      return self.indexOf(value) === index
    })
    return {
      purities: purities,
      quantities: quantities,
      packsizes: packsizes,
      suppliers: suppliers,
      warehouses: warehouses,
      deliveries: deliveries
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
