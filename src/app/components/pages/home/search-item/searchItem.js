import { directive as onClickaway } from 'vue-clickaway'
import searchFilter from './search-Filter/searchFilter.vue'
import recentPage from './recent-page/recentPage.vue'
import listCard from './list-result/listResult.vue'
import formCard from './request-order/requestOrder.vue'
import productMixin from '@/mixins/product'

export default {
  middleware: 'auth',
  mixins: [productMixin],
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
    this.advancedOption = this.advancedOptions === undefined || Object.keys(this.advancedOptions).length === 0
      ? this.advancedOption
      : this.advancedOptions
    this.filterOptions = this.getAdavacedOptions(this.value, this.advancedOption)
  },
  /**
     *click awy directives
     */
  directives: {
    onClickaway: onClickaway
  },
  computed: {
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
      if (this.currentPage == '/home/searchresult') {
        this.topSearchbar = true
      } else {
        this.topSearchbar = false
      }
    },
    search: function () {
      this.searchProducts(this.search)
      this.options = this.getSearchProducts
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
      let tags = this.value.filter((value, index, self) => {
        return self.indexOf(value) === index
      })

      this.setKeywords(tags)
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
    resetTags () {
      this.value = []
      this.setKeywords(this.value)
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
    recentupdates () {
      this.recentPage = true
      this.topSearchbar = false
      this.isAdvancedSearch = true
      this.value = []
    }
  }
}
