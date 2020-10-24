import user from '@/mixins/user'
import { mapActions, mapGetters } from 'vuex'

export default {
  mixins: [user],
  data () {
    return {
      customer: null,
      projectManager: null,
      buyingLead: null,
      internalBuyer: null,
      from: '',
      to: '',
      customers: [],
      projectManagers: [],
      internalBuyers: [],
      buyingLeads: []
    }
  },
  computed: {
    ...mapGetters('analytic', [
      'analyticOrders',
      'popularProducts',
      'getOrdersByMonth',
      'getCompanyDistributionData',
      'getUnavailableProductsByMonth',
      'getInternalBuyerOrdersByMonth',
      'getUnavailableProducts',
      'customerOrders',
      'successfulOrders',
      'slsOrders',
      'completedOrders',
      'pendingOrders'
    ])
    // successfullOrders () {
    //   return this.analyticOrders.map(order => {
    //     return order.status === 'successful' ? order : null
    //   }).filter(order => order)
    // },
    // slsOrders () {
    //   return this.analyticOrders.map(order => {
    //     return order.status === 'sls' ? order : null
    //   }).filter(order => order)
    // },
    // completedOrders () {
    //   return this.analyticOrders.map(order => {
    //     return order.status === 'completed' ? order : null
    //   }).filter(order => order)
    // },
    // pendingOrders () {
    //   return this.analyticOrders.map(order => {
    //     return order.status === 'pending' ? order : null
    //   }).filter(order => order)
    // }
  },
  watch: {
    customer () {
      let option = {
        'customer': this.customer,
        'projectManager': this.projectManager,
        'buyingLead': this.buyingLead,
        'internalBuyer': this.internalBuyer
      }
      this.setAdvancedOptions(this.orders, option)
    },
    projectManager () {
      let option = {
        'customer': this.customer,
        'projectManager': this.projectManager,
        'buyingLead': this.buyingLead,
        'internalBuyer': this.internalBuyer
      }
      this.setAdvancedOptions(this.orders, option)
    },
    buyingLead () {
      let option = {
        'customer': this.customer,
        'projectManager': this.projectManager,
        'buyingLead': this.buyingLead,
        'internalBuyer': this.internalBuyer
      }
      this.setAdvancedOptions(this.orders, option)
    },
    internalBuyer () {
      let option = {
        'customer': this.customer,
        'projectManager': this.projectManager,
        'buyingLead': this.buyingLead,
        'internalBuyer': this.internalBuyer
      }
      this.setAdvancedOptions(this.orders, option)
    }
  },
  methods: {
    ...mapActions('analytic', [
      'setAnalyticOrders',
      'setPopularProducts',
      'setOrdersByMonth',
      'setCompanyDistributionData',
      'setUnavailableOrdersByMonth',
      'setInternalBuyerOrdersByMonth',
      'setUnavailableProducts',
      'setSuccessfulOrders',
      'setSlsOrders',
      'setCompletedOrders',
      'setPendingOrders'
    ]),
    async setAdvancedOptions (orders = [], option = {}) {
      let {customers, managers, buyingLeads, internalBuyers} = await this.getFilterOptions(this.orders, option)
      this.customers = customers
      this.projectManagers = managers
      this.buyingLeads = buyingLeads
      this.internalBuyers = internalBuyers
    },
    async getFilterOptions (orders = [], options = {}) {
      if (this.user) {
        let addresses = []
        let customers = []
        let managers = []
        let buyingLeads = []
        let internalBuyers = []

        if (options.customer) {
          orders = orders.filter(order => {
            return order.user.id === options.customer ? order : null
          })
        }

        if (options.projectManager) {
          orders = orders.filter(order => {
            return order.manager_id === options.projectManager ? order : null
          })
        }

        if (options.buyingLead) {
          orders = orders.filter(order => {
            return order.buying_lead_id === options.buyingLead ? order : null
          })
        }

        if (options.internalBuyer) {
          orders = orders.filter(order => {
            return order.internal_buyer_id === options.internalBuyer ? order : null
          })
        }

        orders.forEach(order => {
          if (order.address) {
            addresses.push({
              value: order.address.id,
              text: order.address.line1
            })
          }
          if (order.user) {
            customers.push({
              value: order.user.id,
              text: order.user.fname + ' ' + order.user.lname
            })
          }
          if (order.manager) {
            managers.push({
              value: order.manager.id,
              text: order.manager.fname + ' ' + order.manager.lname
            })
          }
          if (order.buying_lead) {
            buyingLeads.push({
              value: order.buying_lead.id,
              text: order.buying_lead.fname + ' ' + order.buying_lead.lname
            })
          }
          if (order.internal_buyer) {
            internalBuyers.push({
              value: order.internal_buyer.id,
              text: order.internal_buyer.fname + ' ' + order.internal_buyer.lname
            })
          }
        })

        addresses = addresses.map(item => item['value'])
          .map((item, index, final) => final.indexOf(item) === index && index)
          .filter(item => addresses[item])
          .map(item => addresses[item])
        customers = customers.map(item => item['value'])
          .map((item, index, final) => final.indexOf(item) === index && index)
          .filter(item => customers[item])
          .map(item => customers[item])
        managers = managers.map(item => item['value'])
          .map((item, index, final) => final.indexOf(item) === index && index)
          .filter(item => managers[item])
          .map(item => managers[item])
        buyingLeads = buyingLeads.map(item => item['value'])
          .map((item, index, final) => final.indexOf(item) === index && index)
          .filter(item => buyingLeads[item])
          .map(item => buyingLeads[item])
        internalBuyers = internalBuyers.map(item => item['value'])
          .map((item, index, final) => final.indexOf(item) === index && index)
          .filter(item => internalBuyers[item])
          .map(item => internalBuyers[item])

        return {
          addresses,
          customers,
          managers,
          buyingLeads,
          internalBuyers
        }
      }
      return {
        addresses: [],
        customers: [],
        managers: [],
        buyingLeads: [],
        internalBuyers: []
      }
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
      this.fetchSuccessfullOrders()
      this.$nextTick(() => {})
    }

  }
}
