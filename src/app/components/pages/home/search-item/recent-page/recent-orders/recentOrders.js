import { mapActions, mapGetters } from 'vuex'
import PieChart from './pie-chart/pieChart.js'
import userMixin from '@/mixins/user'
export default {
  middleware: 'auth',
  mixins: [userMixin],
  components: {
    PieChart
  },
  data () {
    return {
      emptyrecords: false,
      allitems: false,
      chartOptions: {
        hoverBorderWidth: 1
      },
      chartData: {
        hoverBackgroundColor: 'red',
        hoverBorderWidth: 2,
        labels: ['Successful', 'Completed', 'Placed with SLS'],
        datasets: [{
          label: 'Data One',
          backgroundColor: ['#00205C', '#68BC4A', '#F4A700'],
          data: [345, 240, 1225]
        }]
      },
      customer_fields: [
        {
          key: 'id',
          label: 'Order No.',
          sortable: false
        },
        {
          key: 'address',
          label: 'Delivery Location',
          sortable: false
        },
        {
          key: 'created_at',
          label: 'Date',
          sortable: false
        },
        {
          key: 'status',
          label: 'Status',
          sortable: false
        },
        {
          key: 'actions',
          label: 'Actions'
        }
      ],
      internal_fields: [{
        key: 'id',
        label: 'Order No.',
        sortable: false
      },
      {
        key: 'user',
        label: 'Customer',
        sortable: false
      },
      {
        key: 'manager',
        label: 'Project Manager',
        sortable: false
      },
      {
        key: 'created_at',
        label: 'Date',
        sortable: false
      },
      {
        key: 'status',
        label: 'Status',
        sortable: false
      },
      {
        key: 'actions',
        label: 'Actions'
      }
      ],
      orders: []
    }
  },
  computed: {
    ...mapGetters('order', [
      'recentOrders',
      'successfulOrders',
      'completedOrders',
      'slsOrders'
    ])
  },
  // watch: {
  //   recentOrders: function () {
  //     this.orders = this.recentOrders
  //   }
  // },
  mounted () {
    this.fetchRecentOrders()
  },
  methods: {
    ...mapActions('order', [
      'setRecentOrders'
    ]),
    ...mapActions('product', [
      'setIsSearch'
    ]),
    async fetchRecentOrders () {
      let success = await this.setRecentOrders()
      if (success) {
        this.orders = this.recentOrders
        console.log(this.recentOrders)
        this.chartData = {
          hoverBackgroundColor: 'red',
          hoverBorderWidth: 2,
          labels: ['Successful', 'Completed', 'Placed with SLS'],
          datasets: [{
            label: 'Data One',
            backgroundColor: ['#00205C', '#68BC4A', '#F4A700'],
            data: [this.successfulOrders, this.completedOrders, this.slsOrders]
          }]
        }
        if (this.orders.length === 0) {
          this.emptyrecords = true
        } else {
          this.allitems = true
        }
      }
    },
    goToSearch () {
      this.setIsSearch(false)
      this.$nextTick(() => {
        this.setIsSearch(true)
      })
    }
  }
}
