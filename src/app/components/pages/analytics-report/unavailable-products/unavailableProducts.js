import {
  directive as onClickaway
} from 'vue-clickaway'
import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'
import analyticMixin from '@/mixins/analytic'

export default {
  middleware: 'auth',
  mixins: [analyticMixin],
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
        key: 'cas',
        label: 'CAS No.',
        sortable: true
      },
      {
        key: 'description',
        label: 'Product Name',
        sortable: true
      },
      {
        key: 'qty',
        label: 'Quantity',
        sortable: true
      },
      {
        key: 'customer',
        label: 'Customer',
        sortable: true
      },
      {
        key: 'user',
        label: 'Requested By',
        sortable: true
      },
      {
        key: 'internal_buyer',
        label: 'Internal Buyer',
        sortable: true
      },
      {
        key: 'order_id',
        label: 'Related Order ID.',
        sortable: true
      },
      {
        key: 'delivery_at',
        label: 'Delivery Date',
        sortable: true
      },
      {
        key: 'created_at',
        label: 'Order Date',
        sortable: true
      },
      {
        key: 'actions',
        label: 'Actions'
      }
      ],
      orders: [{
        id: 1,
        CAS: '4782-76-4',
        Product: 'Calcium Carobonate',
        Quantitiy: 3,
        Customer: 'Dr.reddy’s',
        Requested: 'Hetro Labs',
        Internal: 'Unassigned',
        Related: '1000123456789',
        DeliveryDate: 'Mar 10, 2020',
        Buyer: 'Unassigned',
        date: 'Mar 05, 2020',
        status: true
      },
      {
        id: 2,
        CAS: '4782-54-2',
        Product: 'Calcium Carobonate',
        Quantitiy: 2,
        Customer: 'Hetro Labs',
        Requested: 'Dr.reddy’s',
        Internal: 'Unassigned',
        Related: '1000123456789',
        DeliveryDate: 'Mar 10, 2020',
        Buyer: 'Unassigned',
        date: 'Mar 05, 2020',
        status: true
      },
      {
        id: 3,
        CAS: '4782-76-4',
        Product: 'Calcium Carobonate',
        Quantitiy: 5,
        Customer: 'Dr.reddy’s',
        Requested: 'Hetro Labs',
        Internal: 'Unassigned',
        Related: '1000123456789',
        DeliveryDate: 'Mar 10, 2020',
        Buyer: 'Unassigned',
        date: 'Mar 05, 2020',
        status: true
      },
      {
        id: 4,
        CAS: '4782-54-2',
        Product: 'Calcium Carobonate',
        Quantitiy: 2,
        Customer: 'Hetro Labs',
        Requested: 'Dr.reddy’s',
        Internal: 'Unassigned',
        Related: '1000123456789',
        DeliveryDate: 'Mar 10, 2020',
        Buyer: 'Unassigned',
        date: 'Mar 05, 2020',
        status: true
      },
      {
        id: 5,
        CAS: '4782-76-4',
        Product: 'Calcium Carobonate',
        Quantitiy: 3,
        Customer: 'Dr.reddy’s',
        Requested: 'Hetro Labs',
        Internal: 'Unassigned',
        Related: '1000123456789',
        DeliveryDate: 'Mar 10, 2020',
        Buyer: 'Unassigned',
        date: 'Mar 05, 2020',
        status: true
      },
      {
        id: 6,
        CAS: '4782-54-2',
        Product: 'Calcium Carobonate',
        Quantitiy: 2,
        Customer: 'Hetro Labs',
        Requested: 'Dr.reddy’s',
        Internal: 'Unassigned',
        Related: '1000123456789',
        DeliveryDate: 'Mar 10, 2020',
        Buyer: 'Unassigned',
        date: 'Mar 05, 2020',
        status: true
      },
      {
        id: 7,
        CAS: '4782-76-4',
        Product: 'Calcium Carobonate',
        Quantitiy: 5,
        Customer: 'Dr.reddy’s',
        Requested: 'Hetro Labs',
        Internal: 'Unassigned',
        Related: '1000123456789',
        DeliveryDate: 'Mar 10, 2020',
        Buyer: 'Unassigned',
        date: 'Mar 05, 2020',
        status: true
      },
      {
        id: 8,
        CAS: '4782-54-2',
        Product: 'Calcium Carobonate',
        Quantitiy: 2,
        Customer: 'Hetro Labs',
        Requested: 'Dr.reddy’s',
        Internal: 'Unassigned',
        Related: '1000123456789',
        DeliveryDate: 'Mar 10, 2020',
        Buyer: 'Unassigned',
        date: 'Mar 05, 2020',
        status: true
      },
      {
        id: 7,
        CAS: '4782-76-4',
        Product: 'Calcium Carobonate',
        Quantitiy: 9,
        Customer: 'Dr.reddy’s',
        Requested: 'Hetro Labs',
        Internal: 'Unassigned',
        Related: '1000123456789',
        DeliveryDate: 'Mar 10, 2020',
        Buyer: 'Unassigned',
        date: 'Mar 05, 2020',
        status: true
      },
      {
        id: 10,
        CAS: '4782-54-2',
        Product: 'Calcium Carobonate',
        Quantitiy: 2,
        Customer: 'Hetro Labs',
        Requested: 'Dr.reddy’s',
        Internal: 'Unassigned',
        Related: '1000123456789',
        DeliveryDate: 'Mar 10, 2020',
        Buyer: 'Unassigned',
        date: 'Mar 05, 2020',
        status: true
      }
      ],
      Customer: ['Dr.reddy’s', 'Cipla', 'Hetro Labs'],
      Pmanager: ['Rakesh A', 'Arun Kumar'],
      Buying: ['Sudhakar Reddy', 'varun', 'ashok'],
      Internal: ['sudhakar Reddy', 'arjun']
    }
  },
  /**
   *click awy directives
   */
  directives: {
    onClickaway: onClickaway
  },
  mounted () {
    this.fetchSuccessfullOrders()
    // Set the initial number of orders
    this.totalRows = this.orders.length
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
  methods: {
    fetchSuccessfullOrders (option = {}) {
      this.setPendingOrders(option)
      this.orders = this.pendingOrders.map(request => {
        request.customer = request.order.user.organization
        request.buying_lead_id = request.order.buying_lead_id
        request.manager_id = request.order.manager_id
        request.internal_buyer_id = request.order.internal_buyer_id
        request.manager = request.order.manager
        request.buying_lead = request.order.buying_lead
        request.internal_buyer = request.order.internal_buyer
        return request
      })
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
      console.log(JSON.stringify(this.form))
      // this.filterSection = false
    }
  }
}
