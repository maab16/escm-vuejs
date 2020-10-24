import { Bar } from 'vue-chartjs'
import analyticMixin from '@/mixins/analytic'

export default {
  extends: Bar,
  mixins: [analyticMixin],
  data: () => ({
    chartdata: {},
    options: {
      scales: {
        xAxes: [{ barPercentage: 0.2 }],
        yAxes: [{ id: 'Dataset1',
          position: 'left',
          type: 'linear',
          scaleLabel: { display: true, labelString: 'No. of Orders' } }]
      },
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false, position: 'top' }
    }
  }),

  async created () {
    await this.setUnavailableOrdersByMonth()
    let labels = []
    let data = []

    this.getUnavailableProductsByMonth.forEach(product => {
      labels.push(product.month)
      data.push(product.orders.length)
    })

    this.chartdata = {
      labels: labels,
      datasets: [
        {
          label: 'Completed',
          backgroundColor: '#00205C',
          data: data
        }
      ]
    }
    this.renderChart(this.chartdata, this.options)
  }
}
