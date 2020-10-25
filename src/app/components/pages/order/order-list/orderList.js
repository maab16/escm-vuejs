import { directive as onClickaway } from 'vue-clickaway'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import orderMixin from '@/mixins/order'

export default {
  middleware: 'auth',
  mixins: [orderMixin],
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      form: {
        address: null,
        customer: null,
        manager: null,
        buyingLead: null,
        internalBuyer: null,
        from: '',
        to: ''
      },
      Address: ['Dr.reddy’s', 'Cipla', 'Hetro Labs'],
      Customer: ['Dr.reddy’s', 'Cipla', 'Hetro Labs'],
      Pmanager: ['Rakesh A', 'Arun Kumar'],
      Buying: ['Sudhakar Reddy', 'varun', 'ashok'],
      Internal: ['sudhakar Reddy', 'arjun'],
      showDecadeNav: false,
      hideHeader: true,
      filterSection: false,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 20],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: '',
      filterOn: [],
      orderFilterKey: 'all',
      countlist: [],
      customer_fields: [
        {
          key: 'id',
          label: 'Order No.',
          sortable: true
        },
        {
          key: 'address',
          label: 'Delivery Location',
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
          sortable: true
        },
        {
          key: 'meta',
          label: ''
        },
        {
          key: 'actions', 
          label: 'Actions'
        }
      ],
      fielast_namelds: [
        {
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
        // {
        //   key: 'Delivery',
        //   label: 'Delivery Location',
        //   sortable: true
        // },
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
          sortable: true
        },
        {
          key: 'meta',
          label: ''
        },
        {
          key: 'actions', 
          label: 'Actions'
        }
      ],
      ordersList: []
    }
  },
  /**
     *click awy directives
     */
  directives: {
    onClickaway: onClickaway
  },
  computed: {
    /**
     * tabs changes data list
     */
    orderFilter () {
      return this[this.orderFilterKey]
    },
    all () {
      this.ordersList = this.orders.map(order => {
        order.meta = {
          id: order.id
        }
        return order
      })
      return this.ordersList
    },
    success () {
      this.ordersList = this.orders.map(order => {
        if (order.status === 'successful') {
          order.meta = {
            id: order.id
          }
          return order
        }
        return null
      })
      this.ordersList = this.ordersList.filter(order => order)
      return this.orders.filter(order => order.status === 'successful')
    },
    complete () {
      this.ordersList = this.orders.map(order => {
        if (order.status === 'completed') {
          order.meta = {
            id: order.id
          }
          return order
        }
      })
      this.ordersList = this.ordersList.filter(order => order)
      return this.orders.filter(order => order.status === 'completed')
    },
    sls () {
      this.ordersList = this.orders.map(order => {
        if (order.status === 'sls') {
          order.meta = {
            id: order.id
          }
          return order
        }
      })
      this.ordersList = this.ordersList.filter(order => order)
      return this.orders.filter(order => order.status === 'sls')
    },
    /**
     * tabs count list
     */
    filteredArray () {
      const ret = {}
      this.listData = this.ordersList.forEach(element => {
        const dataStatus = element.status
        ret[dataStatus] = {
          status: dataStatus,
          count: ret[dataStatus] && ret[dataStatus].count
            ? ret[dataStatus].count + 1 : 1
        }
      })
      const statusData = Object.values(ret)
      return statusData
    }
  },
  mounted () {
    this.fetchOrderList(this.form)
    console.log(this.orders)
  },
  methods: {
    orderDate (date) {
      return date
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
    onFiltered (filteredItems) {
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
    async onSubmit (evt) {
      evt.preventDefault()
      // this.filterOrderlist()
      // this.filterOrders({
      //   customer_id: this.form.customer ? this.form.customer : null,
      //   manager_id: this.form.manager ? this.form.manager : null,
      //   buying_lead_id: this.form.buying_lead ? this.form.buying_lead : null,
      //   internal_buyer_id: this.form.internal_buyer ? this.form.internal_buyer : null,
      //   from: this.form.from ? this.format(this.form.from) : null,
      //   to: this.form.to ? this.format(this.form.to) : null
      // })
      await this.setOrders(this.form)
      this.ordersList = this.orders.map(order => {
        order.meta = {
          id: order.id
        }
        return order
      })
      this.filterSection = false
    },
    orderDetail (res) {
      console.log(res)
      this.$router.push({name: 'order-detail', params: { id: res }})
    }
  }
}
