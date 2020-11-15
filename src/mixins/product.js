import { mapActions, mapGetters } from 'vuex'

export default {
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
    ])
  },
  methods: {
    ...mapActions('product', [
      'setProducts',
      'searchProducts',
      'removeSearchTag',
      'advancedSearchProducts',
      'setKeywords',
      'setAdvancedOptions'
    ]),
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
      this.recentPage = false
      this.disabled = true
      this.topSearchbar = true
      this.isAdvancedSearch = false
    }
  }
}
