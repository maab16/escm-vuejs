import analytic from '@/mixins/analytic'

export default {
  mixins: [analytic],
  data () {
    return {
      type: 'completed'
    }
  },
  async mounted () {
    this.fetchOrders()
    // Set the initial number of orders
    this.totalRows = this.orders.length
  }
}
