import {
  directive as onClickaway
} from 'vue-clickaway'
import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'
import requestFields from '@/mixins/request-table-fields'
import { mapActions, mapGetters } from 'vuex'
export default {
  middleware: 'auth',
  extends: requestFields,
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      form: {
        Customer: null,
        Pmanager: null,
        Buying: null,
        Internal: null,
        from: '',
        to: ''
      },
      showDecadeNav: false,
      hideHeader: true,
      filterSection: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: '',
      filterOn: [],
      bgInfo: true,
      bgSuccess: false,
      bgprimary: false,
      countlist: [],
      Customer: ['Dr.reddy’s', 'Cipla', 'Hetro Labs'],
      Pmanager: ['Rakesh A', 'Arun Kumar'],
      Buying: ['Sudhakar Reddy', 'varun', 'ashok'],
      Internal: ['sudhakar Reddy', 'arjun'],
      orders: []
    }
  },
  /**
   *click awy directives
   */
  directives: {
    onClickaway: onClickaway
  },
  mounted () {
    this.setRequestOrders()
    // Set the initial number of orders
    // console.log(this.orders)
  },
  computed: {
    ...mapGetters('request', {
      requestOrders: 'orders'
    }),
    statusConnt () {
      return this.count(this.order)
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
  methods: {
    ...mapActions('request', [
      'setOrders'
    ]),
    async setRequestOrders () {
      let result = await this.setOrders()
      if (result) {
        this.orders = this.requestOrders.map(orderDetail => {
          orderDetail.actions = {
            id: orderDetail.order_id
          }
          return orderDetail
        })

        this.totalRows = this.orders.length
      }
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
     * filter Reset
     */
    onReset (evt) {
      evt.preventDefault()
      this.form.Customer = null
      this.form.Pmanager = null
      this.form.Buying = null
      this.form.Internal = null
      this.form.from = null
      this.form.to = null
      this.$nextTick(() => {})
    },
    /**
     *filter Submit
     */
    onSubmit (evt) {
      evt.preventDefault()
      // this.filterOrderlist()
      console.log(JSON.stringify(this.form))
      // this.filterSection = false
    }
  }
}
