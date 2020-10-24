import moment from 'moment'

const mixin = {
  computed: {},
  methods: {
    format (date, format = 'YYYY-MM-DD HH:mm:ss') {
      return moment(date).format(format)
    }
  }
}

export default mixin
