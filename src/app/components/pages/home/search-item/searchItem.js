import { directive as onClickaway } from 'vue-clickaway'
import searchFilter from './search-Filter/searchFilter.vue'
import recentPage from './recent-page/recentPage.vue'
import listCard from './list-result/listResult.vue'
import formCard from './request-order/requestOrder.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  components: {
    'app-filter': searchFilter,
    'app-recentpage': recentPage,
    'app-listcard': listCard,
    'app-formcard': formCard
  },
  data () {
    return {
      value: [],
      search: '',
      tagList: false,
      searchButton: false,
      advanceFilter: false,
      isAdvancedSearch: true,
      disabled: false,
      allTags: '',
      topSearchbar: false,
      recentPage: true,
      searchItems: [],
      options: [],
      advancedOption: {
        supplier: null,
        warehouse: null,
        packsize: null,
        qty: null,
        purity: null,
        delivery: null
      },
      filterOptions: {
        suppliers: [],
        warehouses: [],
        packsizes: [],
        quantities: [],
        purities: [],
        deliveries: []
      },
      maxSearchItem: process.env.MAX_KEYWORD,
      isCasNumberValid: true
    }
  },
  mounted () {
    this.options = this.products
    this.value = this.keywords
    console.log(this.advancedOptions === undefined)
    this.advancedOption = this.advancedOptions === undefined || Object.keys(this.advancedOptions).length === 0
      ? this.advancedOption
      : this.advancedOptions
    this.filterOptions = this.getAdavacedOptions(this.value, this.advancedOption)

    console.log(this.filterOptions)
    // this.purities = options.purities
    // this.quantities = options.quantities
    // this.packsizes = options.packsizes
    // this.suppliers = options.suppliers
    // this.warehouses = options.warehouses
    // this.deliveries = options.deliveries
  },
  /**
     *click awy directives
     */
  directives: {
    onClickaway: onClickaway
  },
  computed: {
    ...mapGetters('product', [
      'products',
      'getSearchProducts',
      'isCasNumber',
      'isSearch',
      'getProductsByCas',
      'keywords',
      'advancedOptionS',
      'getAdavacedOptions'
    ]),
    tags: {
      get () {
        return this.value
      },
      set (tags) {
        this.value = tags
      }
    },
    checkCasNumberValid: {
      get () {
        return this.isCasNumberValid
      },
      set (value) {
        this.isCasNumberValid = value
      }
    },
    /**
     *search order list
     */
    criteria () {
      return this.search.trim(this.option).toLowerCase()
    },
    availableOptions () {
      return this.options.filter(option => !this.value.includes(option.cas))
        .filter((value, index, self) => {
          return self.indexOf(value) === index
        })
    },
    searchDesc () {
      if (this.criteria && this.availableOptions.length === 0) {
        return 'There are no tags matching your search criteria'
      }
      return ''
    },
    currentPage () {
      return this.$route.path
    }
  },
  /**
     *search bar top header
     */
  watch: {
    currentPage: function () {
      if (this.currentPage === '/home/searchresult') {
        this.topSearchbar = true
      } else {
        this.topSearchbar = false
      }
    },
    search: function () {
      this.searchProducts(this.search)

      this.options = this.getSearchProducts
      // this.getSearchProducts.map(option => {
      //   // this.options.push(option.name)
      //   this.options.push(option.cas)
      // })
    },
    value: function () {
      this.filterOptions = this.getAdavacedOptions(this.value, this.advancedOption)
      if (this.disabled) {
        let options = {
          supplier: null,
          purity: null,
          qty: null,
          warehouse: null,
          packsize: null,
          delivery: null
        }
        this.advancedSearch(options, this.value)
      }
    },
    isSearch: function () {
      this.$refs.search.focus()
    }
  },

  beforeMount () {
    if (this.searchItems === 0) {
      console.log(this.recentPage = true)
    }
    if (this.currentPage === '/home/searchresult') {
      this.topSearchbar = true
    } else {
      this.topSearchbar = false
    }
  },
  methods: {
    ...mapActions('product', [
      'searchProducts',
      'advancedSearchProducts',
      'setKeywords',
      'setAdvancedOptions'
    ]),
    searchOnkeyup (event, addTag) {
      let tag = this.search
      let isValid = false
      this.isCasNumberValid = true

      if (tag.indexOf(',') > -1) {
        tag = tag.slice(0, -1)
        isValid = true
      } else if (event.keyCode === 13) {
        isValid = true
      }

      if (!this.isCasNumber(tag)) {
        isValid = false
        this.isCasNumberValid = false
      }

      if (isValid) {
        let cas = tag.replace(/\s+/g, ' ').trim()
        this.value.push(cas)
        this.search = ''
      }
    },
    /**
     *click awy order list
     */
    away () {
      this.tagList = false
    },
    /**
     *click advance filter
     */
    filterform () {
      this.advanceFilter = false
    },
    /**
     *select tags on list
     */
    onOptionClick ({ option, addTag, tags }) {
      let cas = option.cas.replace(/\s+/g, ' ').trim()
      if (tags.length >= this.maxSearchItem) {
        console.log('You can search maximum ' + this.maxSearchItem + ' products.')
      }
      if (!this.isCasNumber(cas)) {
        console.log('Please enter valid CAS number.')
        return
      }
      addTag(cas)
      this.isCasNumberValid = true
      this.allTags = ''
      this.search = ''
      this.tagList = false
      this.searchButton = true
      this.disabled = false
      this.isAdvancedSearch = true
    },
    removeTagItem (removeTag, tag) {
      removeTag(tag)
    },
    /**
     *select tags on list view
     */
    listView () {
      this.tagList = true
      this.searchButton = true
    },
    /**
     *Advance search hide and show  method
     */
    advanceSearhfilter () {
      this.advanceFilter = true
    },
    isCasAvailable (cas, items) {
      let isAvailable = false

      items.map(item => {
        if (item.cas.trim().toLowerCase() === cas.trim().toLowerCase()) {
          isAvailable = true
        }
      })

      return isAvailable
    },
    advancedSearch (options, tags, orderBy = null, orderDirection = 'desc') {
      tags = this.value.filter((value, index, self) => {
        return self.indexOf(value) === index
      })

      this.setKeywords(tags)
      this.setAdvancedOptions(options)

      this.advancedSearchProducts({
        options: options,
        tags: tags,
        orderBy: orderBy,
        orderDirection: orderDirection
      })

      this.searchItems = this.getSearchProducts

      console.log(this.searchItems)

      if (tags.length > 0) {
        tags.map(cas => {
          // if (this.getProductsByCas(cas).length < 1) {
          if (!this.isCasAvailable(cas, this.searchItems)) {
            this.searchItems.push({
              cas: this.isCasNumber(cas) ? cas : '',
              name: !this.isCasNumber(cas) ? cas : '',
              supplier: options.supplier,
              purity: options.purity,
              qty: options.qty,
              warehouse: options.warehouse,
              packsize: options.packsize,
              delivery: options.delivery,
              availability: 0
            })
          }
        })
      }
      
      this.recentPage = false
      this.disabled = true
      this.topSearchbar = true
      this.isAdvancedSearch = false
      this.advanceFilter = false
    },
    /**
     *search Result Function
     */
    searchResult (tags) {
      let options = {
        supplier: null,
        purity: null,
        qty: null,
        warehouse: null,
        packsize: null,
        delivery: null
      }

      this.advancedSearch(options, tags)
      // tags = this.value.filter((value, index, self) => {
      //   return self.indexOf(value) === index
      // })

      // this.advancedSearchProducts({
      //   options: options,
      //   tags: tags
      // })

      // let items = this.getSearchProducts

      // this.searchItems = items

      // if (tags.length > 0) {
      //   this.searchItems = []
      //   tags = tags.filter(tag => {
      //     let isTag = false
      //     items = items.filter(product => {
      //       if (product.name === tag || product.cas === tag) {
      //         this.searchItems.push(product)
      //         isTag = true
      //         return false
      //       }
      //       return product
      //     })

      //     if (!isTag) {
      //       this.searchItems.push({
      //         cas: this.isCasNumber(tag) ? tag : '',
      //         name: !this.isCasNumber(tag) ? tag : '',
      //         supplier: '',
      //         purity: '',
      //         qty: '',
      //         warehouse: '',
      //         packsize: '',
      //         delivery: '',
      //         availability: 0
      //       })
      //       return tag
      //     }
      //   })
      // }

      this.recentPage = false
      this.disabled = true
      this.topSearchbar = true
      this.isAdvancedSearch = false
    },
    recentupdates () {
      this.recentPage = true
      this.topSearchbar = false
      this.isAdvancedSearch = true
      this.value = []
    }
  }
}
