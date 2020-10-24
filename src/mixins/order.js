import Order from '@/Modules/Order/order.model'
import user from '@/mixins/user'
import { mapGetters, mapActions } from 'vuex'

const mixin = {
  mixins: [user],
  computed: {
    ...mapGetters('order', [
      'orders',
      'order',
      'recentOrders',
      'successfulOrders',
      'completedOrders',
      'slsOrders',
      'getMaxOrderId',
      'getMaxOrderDetailsId'
    ])
  },
  methods: {
    ...mapActions('order', [
      'filterOrders',
      'setOrders',
      'makeOrder',
      'fetchOrderDetails',
      'setRecentOrders',
      'updateOrderDeatils',
      'updateOrder',
      'updateOrderHistory'
    ]),
    /**
     * Retrive Order List API Data
     */
    async fetchOrderList (form) {
      await this.setOrders(form)
      let {addresses, customers, managers, buyingLeads, internalBuyers} = await this.getFilterOptions()
      this.Address = addresses
      this.Customer = customers
      this.Pmanager = managers
      this.Buying = buyingLeads
      this.Internal = internalBuyers
      this.ordersList = this.orders.map(order => {
        order.meta = {
          id: order.id
        }
        return order
      })
    },
    async getFilterOptions () {
      if (this.user) {
        console.log(this.user)
        let addresses = []
        let customers = []
        let managers = []
        let buyingLeads = []
        let internalBuyers = []
        let orders = []
        if (this.isAdmin || this.isSupplierManager) {
          orders = Order.query().withAllRecursive().get()
        } else if (this.isManager) {
          orders = Order.query().withAllRecursive().where('manager_id', this.user.id).get()
        } else if (this.isBuyingLead) {
          orders = Order.query().withAllRecursive().where('buying_lead_id', this.user.id).get()
        } else if (this.isInternalBuyer) {
          orders = Order.query().withAllRecursive().where('internal_buyer_id', this.user.id).get()
        } else if (this.isCustomer) {
          orders = Order.query().withAllRecursive().where('user_id', this.user.id).get()
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
    }
  }
}

export default mixin
