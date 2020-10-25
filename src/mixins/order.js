import Order from '@/Modules/Order/order.model'
import user from '@/mixins/user'
import { mapGetters, mapActions } from 'vuex'

export default {
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
      this.setAdvancedFilterOptions()
    },
    async setAdvancedFilterOptions () {
      if (this.user) {
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

        let {addresses, customers, managers, buyingLeads, internalBuyers} = await this.getFilterOptions(orders)
        this.addresses = addresses
        this.customers = customers
        this.projectManagers = managers
        this.buyingLeads = buyingLeads
        this.internalBuyers = internalBuyers
        this.ordersList = this.orders.map(order => {
          order.meta = {
            id: order.id
          }
          return order
        })
      }
    }
  }
}
