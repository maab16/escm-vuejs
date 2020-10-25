import analytic from '@/mixins/analytic'

export default {
  mixins: [analytic],
  data () {
    return {
      type: 'successful'
    }
  },
  async mounted () {
    console.log(this.type)
    this.fetchOrders()
    // Set the initial number of orders
    this.totalRows = this.orders.length
  }
}
