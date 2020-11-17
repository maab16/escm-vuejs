import requestFields from '@/mixins/request-table-fields'

export default {
  middleware: ['auth', 'analytic'],
  mixins: [requestFields],
  data () {
    return {
      type: 'pending'
    }
  },
  mounted () {
    this.fetchRequests()
    // Set the initial number of orders
    this.totalRows = this.orders.length
  }
}
