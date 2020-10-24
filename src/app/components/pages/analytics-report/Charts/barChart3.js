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
        yAxes: [{ id: 'Dataset2',
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
    await this.setInternalBuyerOrdersByMonth()
    let labels = ['']
    let data = [0]

    this.getInternalBuyerOrdersByMonth.forEach(buyer => {
      labels.push(buyer.name)
      data.push(buyer.orders.length)
    })

    this.chartdata = {
      labels: labels,
      datasets: [
        {
          label: 'Completed',
          backgroundColor: '#68BC4A',
          data: data
        }
      ]
    }
    this.renderChart(this.chartdata, this.options)
  }
}
