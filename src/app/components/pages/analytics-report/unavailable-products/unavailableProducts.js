import analyticMixin from '@/mixins/analytic'

export default {
  mixins: [analyticMixin],
  data () {
    return {
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
      orders: []
    }
  },
  mounted () {
    this.fetchUnavailableOrders()
    // Set the initial number of orders
    this.totalRows = this.orders.length
  },
  methods: {
    fetchUnavailableOrders (option = {}) {
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
     * filter Reset
     */
    onReset (evt) {
      evt.preventDefault()
      this.customer = null
      this.projectManager = null
      this.buyingLead = null
      this.internalBuyer = null
      this.from = null
      this.to = null
      this.setAdvancedOptions(this.orders, {})
      this.fetchUnavailableOrders()
      this.$nextTick(() => {})
    },
    /**
     *filter Submit
     */
    onSubmit (evt) {
      evt.preventDefault()
      this.fetchUnavailableOrders(this.getAdvancedFormOptions())
      console.log(JSON.stringify(this.form))
      // this.filterSection = false
    }
  }
}
