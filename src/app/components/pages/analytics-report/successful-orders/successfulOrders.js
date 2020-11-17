import analytic from '@/mixins/analytic'

export default {
  middleware: ['auth', 'analytic'],
  mixins: [analytic],
  data () {
    return {
      type: 'successful'
    }
  },
  async mounted () {
    // console.log(this.type)
    this.fetchOrders()
    // console.log(this.orders)
    // Set the initial number of orders
    this.totalRows = this.orders.length
  }
}
