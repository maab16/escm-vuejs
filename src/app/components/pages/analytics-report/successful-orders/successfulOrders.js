import { directive as onClickaway } from 'vue-clickaway'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import analyticMixin from '@/mixins/analytic'

export default {
  middleware: 'auth',
  extends: analyticMixin,
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      showDecadeNav: false,
      hideHeader: true,
      filterSection: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 25,
      pageOptions: [10, 25, 50],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: '',
      filterOn: [],
      bgInfo: true,
      bgSuccess: false,
      bgprimary: false,
      countlist: [],
      fields: [{
        key: 'id',
        label: 'Order No.',
        sortable: true
      },
      {
        key: 'user',
        label: 'Customer',
        sortable: true
      },
      {
        key: 'manager',
        label: 'Project Manager',
        sortable: true
      },
      {
        key: 'buying_lead',
        label: 'Buying Lead',
        sortable: true
      },
      {
        key: 'address',
        label: 'Delivery Location',
        sortable: true
      },
      {
        key: 'internal_buyer',
        label: 'Internal Buyer',
        sortable: true
      },
      {
        key: 'created_at',
        label: 'Order Date',
        sortable: true
      },
      {
        key: 'status',
        label: 'Status',
        sortable: false
      },
      { key: 'actions', label: 'Actions' }
      ],
      orders: []
    }
  },
  /**
     *click awy directives
     */
  directives: {
    onClickaway: onClickaway
  },
  computed: {
    statusConnt () {
      return this.count(this.orders)
    },
    rows () {
      return this.orders.length
    },
    sortOptions () {
      // Create an options list from our fields
      return this.fielast_namelds
        .filter(f => f.sortable)
        .map(f => {
          return {
            text: f.label,
            value: f.key
          }
        })
    }
  },
  async mounted () {
    this.fetchSuccessfullOrders()
    // Set the initial number of orders
    this.totalRows = this.orders.length
  },
  methods: {
    fetchSuccessfullOrders (option = {}) {
      this.setSuccessfulOrders(option)
      this.orders = this.successfulOrders
      this.setAdvancedOptions(this.orders, option)
    },
    /**
     *click away method
     */
    sortfilter () {
      this.filterSection = false
    },
    /**
     *click away filtersearch
     */
    filterSearch () {
      this.filterSection = !this.filterSection
    },
    count (array) {
      let counts = array.reduce((out, {
        status
      }) => ({
        ...out,
        [status]: out[status] + 1 || 1
      }), {})
      return Object.keys(counts).map(key => ({
        status: key,
        count: counts[key]
      }))
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    /**
     *filter Submit
     */
    onSubmit (evt) {
      evt.preventDefault()
      this.fetchSuccessfullOrders({
        'customer': this.customer,
        'projectManager': this.projectManager,
        'buyingLead': this.buyingLead,
        'internalBuyer': this.internalBuyer,
        'from': this.from,
        'to': this.to
      })
      // this.filterOrderlist()
      console.log(JSON.stringify(this.form))
      // this.filterSection = false
    }
  }
}
