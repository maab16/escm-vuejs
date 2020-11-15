import BarChart3 from '../Charts/barChart3'
import BarChart2 from '../Charts/barChart2'
import BarChart from '../Charts/barChart'
import PieChart from '../Charts/pieChart'
import analyticMixin from '@/mixins/analytic'

export default {
  middleware: ['auth', 'analytic'],
  mixins: [analyticMixin],
  components: {
    BarChart3,
    BarChart2,
    BarChart,
    PieChart
  },
  data () {
    return {
      perPage: 6,
      datacollection: {
        labels: ['Sep’19', 'Oct’19', 'Nov’19', 'Dec’19', 'Jan’20', 'Feb’20', 'Mar’20'],
        datasets: [{
          label: 'Unavailable Products',
          data: [10, 14, 13, 8, 5, 14],
          fill: false,
          borderColor: '#2196f3',
          backgroundColor: '#2196f3',
          borderWidth: 1
        }]
      },

      chartOptions: {
        maintainAspectRation: false,
        responsive: false,
        scales: {
          yAxes: [{
            stacked: true,
            gridLines: {
              display: true
            },
            scaleLabel: { display: false, labelString: 'No. of Orders' },
            ticks: {
              beginAtZero: false,
              stepSize: 5
            }
          }],
          xAxes: [{
            gridLines: {
              display: true
            }
          }]
        }
      },

      chartData: {},
      fields: [{
        key: 'name',
        label: 'Customer'
      },
      {
        key: 'total',
        label: 'Total'
      },
      {
        key: 'successful',
        label: 'Successful'
      },
      {
        key: 'sls',
        label: 'Placed With SLS'
      },
      {
        key: 'completed',
        label: 'Completed'
      },
      {
        key: 'pending',
        label: 'Pending'
      },
      {
        key: 'actions',
        label: 'Actions'
      }
      ],
      orders: [{
        id: 1,
        Customers: 'Dr. Reddy’s',
        Total: 483,
        Completed: 401,
        Partial: 567,
        Pending: 678
      },
      {
        id: 2,
        Customers: 'Aurabindo',
        Total: 483,
        Completed: 401,
        Partial: 567,
        Pending: 678
      },
      {
        id: 3,
        Customers: 'Cipla',
        Total: 483,
        Completed: 401,
        Partial: 567,
        Pending: 678
      },
      {
        id: 4,
        Customers: 'Dr.reddy’s',
        Total: 483,
        Completed: 401,
        Partial: 567,
        Pending: 678
      },
      {
        id: 5,
        Customers: 'Lorem ipsum',
        Total: 483,
        Completed: 401,
        Partial: 567,
        Pending: 678
      },
      {
        id: 6,
        Customers: 'Dr.reddy’s',
        Total: 483,
        Completed: 401,
        Partial: 567,
        Pending: 678
      },
      {
        id: 7,
        Customers: 'Dr.reddy’s',
        Total: 483,
        Completed: 401,
        Partial: 567,
        Pending: 678
      },
      {
        id: 8,
        Customers: 'Dr.reddy’s',
        Total: 483,
        Completed: 401,
        Partial: 567,
        Pending: 678
      },
      {
        id: 9,
        Customers: 'Dr.reddy’s',
        Total: 483,
        Completed: 401,
        Partial: 567,
        Pending: 678
      },
      {
        id: 10,
        Customers: 'Dr.reddy’s',
        Total: 483,
        Completed: 401,
        Partial: 567,
        Pending: 678
      },
      {
        id: 11,
        Customers: 'Dr.reddy’s',
        Total: 483,
        Completed: 401,
        Partial: 567,
        Pending: 678
      }
      ],
      popularProduct: [{
        id: 1,
        CAS: '1898-11-4',
        Product: 'Calcium Carobonate',
        equa: 'CaCO3',
        order: 45
      },
      {
        id: 2,
        CAS: '0758-12-3',
        Product: 'Acetic Acid-d',
        equa: 'C2H3DO2',
        order: 40
      },
      {
        id: 3,
        CAS: '5745-34-1',
        Product: 'Sodium Hydroxide',
        equa: 'NaOH',
        order: 30
      },
      {
        id: 4,
        CAS: '0758-12-3',
        Product: 'Calcium Sulphate',
        equa: 'CaSO4',
        order: 20
      },
      {
        id: 5,
        CAS: '3358-89-8',
        Product: 'Calcium Chloride',
        equa: 'CaCI2',
        order: 54
      },
      {
        id: 6,
        CAS: '0758-12-3',
        Product: 'Acetic Acid-d',
        equa: 'C2H3DO2',
        order: 40
      },
      {
        id: 7,
        CAS: '5745-34-1',
        Product: 'Sodium Hydroxide',
        equa: 'NaOH',
        order: 30
      },
      {
        id: 8,
        CAS: '0758-12-3',
        Product: 'Calcium Sulphate',
        equa: 'CaSO4',
        order: 20
      },
      {
        id: 9,
        CAS: '3358-89-8',
        Product: 'Calcium Chloride',
        equa: 'CaCI2',
        order: 54
      }
      ],
      customers: []
    }
  },
  watch: {
    getCompanyDistributionData () {
      let labels = []
      let data = []
      this.getCompanyDistributionData.forEach(distribution => {
        labels.push(distribution.name)
        data.push(distribution.total)
      })
      this.chartData = {
        labels: labels,
        datasets: [{
          backgroundColor: [
            '#69B7FF',
            '#26A69A',
            '#0E89AC',
            '#5C6BC0',
            '#6AC06D',
            '#F5B953',
            '#7D90A4'
          ],
          data: data,
          cutoutPercentage: 0
        }]
      }
    }
  },
  async mounted () {
    await this.setSuccessfulOrders({})
    await this.setSlsOrders({})
    await this.setCompletedOrders({})
    await this.setPendingOrders({})
    await this.setAnalyticOrders()
    await this.setPopularProducts()
    await this.setCompanyDistributionData()
    await this.setUnavailableProducts()
    await this.setCompanyDataByBuyer()
    this.customers = this.customerOrders
  },
  methods: {
    viewmore () {
      this.$router.push('/analytics/analtics-detail')
    }
  }
}
