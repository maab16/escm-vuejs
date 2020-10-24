export default {
  middleware: 'auth',
  data () {
    return {
      emptyupdates: false,
      allupdates: false,
      updates: [
        {
          order: true,
          ordernumber:
            '1000123456789',
          description: '',
          date: 'Mar 06, 2020 - 12:46 pm'
        },
        {
          order: false,
          username: 'Sudhakar Reddy',
          ordernumber:
            '1000123456789',
          description:
            '“Product 1234-3-23 is not available right now. It will take some time to be delivered.”',
          date: 'Mar 02, 2020 - 10:15 am'
        },
        {
          order: true,
          ordernumber:
            '1000173946289',
          description: '',
          date: 'Mar 01, 2020 - 12:46 pm'
        },
        {
          order: true,
          ordernumber:
            '1000842764196',
          description: '',
          date: 'Feb 26, 2020 - 11:54 am'
        },
        {
          order: false,
          username: 'Arun Kumar',
          ordernumber: '1000173812976',
          description:
            '“Product 1234-3-23 is not available right now. It will take some time to be delivered.”',
          date: 'Feb 23, 2020 - 12:36 pm'
        }
      ]
    }
  },
  mounted () {
    if (this.updates.length === 0) {
      this.emptyupdates = true
    } else {
      this.allupdates = true
    }
  },
  methods: {}
}
