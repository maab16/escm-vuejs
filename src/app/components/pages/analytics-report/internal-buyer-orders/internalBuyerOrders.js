import { directive as onClickaway } from 'vue-clickaway'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  middleware: 'auth',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      form: {
        Customer: null,
        Pmanager: null,
        Buying: null,
        Internal: null,
        from: '',
        to: ''
      },
      showDecadeNav: false,
      hideHeader: true,
      filterSection: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 25,
      pageOptions: [10, 25, 50],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: '',
      filterOn: [],
      bgInfo: true,
      bgSuccess: false,
      bgprimary: false,
      countlist: [],
      fielast_namelds: [{
        key: 'orderNo',
        label: 'Order No.',
        sortable: true
      },
      {
        key: 'Customers',
        label: 'Customer',
        sortable: true
      },
      {
        key: 'manager',
        label: 'Project Manager',
        sortable: true
      },
      {
        key: 'Buyer',
        label: 'Buying Lead',
        sortable: true
      },
      {
        key: 'Delivery',
        label: 'Delivery Location',
        sortable: true
      },
      {
        key: 'internal',
        label: 'Internal Buyer',
        sortable: true
      },
      {
        key: 'date',
        label: 'Order Date',
        sortable: true
      },
      {
        key: 'status',
        label: 'Status',
        sortable: false
      },
      { key: 'actions', label: 'Actions' }
      ],
      orders: [
        {
          'id': 1,
          'orderNo': '1000123456781',
          'Customers': 'Dr.reddy’s',
          'Buyer': 'Unassigned',
          'Delivery': 'Hyderabad, India',
          'manager': 'Rakesh A',
          'internal': 'Sudhakar Reddy',
          'date': '2020-01-03',
          'status': 'Completed'
        },
        {
          'id': 2,
          'orderNo': '1000849264722',
          'Customers': 'SLS',
          'Buyer': 'Sudhakar Reddy',
          'Delivery': 'Pune, India',
          'manager': 'Arun Kumar',
          'internal': 'Sudhakar Reddy',
          'date': '2020-03-03',
          'status': 'Successful'
        },
        {
          'id': 3,
          'orderNo': '1000138294533',
          'Customers': 'Cipla',
          'Buyer': 'Sudhakar Reddy',
          'Delivery': 'Hyderabad, India',
          'manager': 'Rakesh A',
          'internal': 'Sudhakar Reddy',
          'date': '2020-03-03',
          'status': 'Placed with SLS'
        },
        {
          'id': 4,
          'orderNo': '1000784536784',
          'Customers': 'Dr.reddy’s',
          'Buyer': 'Unassigned',
          'Delivery': 'Pune, India',
          'manager': 'Arun Kumar',
          'internal': 'Sudhakar Reddy',
          'date': '2020-04-03',
          'status': 'Completed'
        },
        {
          'id': 5,
          'orderNo': '1000123456785',
          'Customers': 'Ubuntu',
          'Buyer': 'Ramesh K',
          'Delivery': 'Bangalore, India',
          'manager': 'Rakesh A',
          'internal': 'Sudhakar Reddy',
          'date': '2020-05-03',
          'status': 'Placed with SLS'
        },
        {
          'id': 6,
          'orderNo': '1000123456786',
          'Customers': 'Dr.reddy’s',
          'Buyer': 'Unassigned',
          'Delivery': 'Pune, India',
          'manager': 'Unassigned',
          'internal': 'Sudhakar Reddy',
          'date': '2020-06-03',
          'status': 'Completed'
        },
        {
          'id': 7,
          'orderNo': '1000849264727',
          'Customers': 'SLS',
          'Buyer': 'Sudhakar Reddy',
          'Delivery': 'banglore,india',
          'manager': 'Arun kumar',
          'internal': 'Sudhakar Reddy',
          'date': '2020-07-03',
          'status': 'Successful'
        },
        {
          'id': 8,
          'orderNo': '1000784536788',
          'Customers': 'Dr.reddy’s',
          'Buyer': 'Unassigned',
          'Delivery': 'Pune, India',
          'manager': 'Rakesh A',
          'internal': 'Sudhakar Reddy',
          'date': '2020-08-03',
          'status': 'Completed'
        },
        {
          'id': 9,
          'orderNo': '1000123456789',
          'Customers': 'Ubuntu',
          'Buyer': 'Ramesh K',
          'Delivery': 'Hyderabad, India',
          'manager': 'Arun Kumar',
          'internal': 'Sudhakar Reddy',
          'date': '2020-09-03',
          'status': 'Successful'
        },
        {
          'id': 10,
          'orderNo': '1000123456710',
          'Customers': 'Dr.reddy’s',
          'Buyer': 'Unassigned',
          'Delivery': 'Bangalore, India',
          'manager': 'Rakesh A',
          'internal': 'Sudhakar Reddy',
          'date': '2020-10-03',
          'status': 'Placed with SLS'
        },
        {
          'id': 11,
          'orderNo': '1000849264711',
          'Customers': 'SLS',
          'Buyer': 'Sudhakar Reddy',
          'Delivery': 'Pune, India',
          'manager': 'Unassigned',
          'internal': 'Sudhakar Reddy',
          'date': '2020-05-03',
          'status': 'Completed'
        },
        {
          'id': 12,
          'orderNo': '1000849264712',
          'Customers': 'SLS',
          'Buyer': 'Sudhakar Reddy',
          'Delivery': 'Pune, India',
          'manager': 'Rakesh A',
          'internal': 'Sudhakar Reddy',
          'date': 'Mar 03, 2020',
          'status': 'Placed with SLS'
        },
        {
          'id': 13,
          'orderNo': '1000138294513',
          'Customers': 'Cipla',
          'Buyer': 'Sudhakar Reddy',
          'Delivery': 'Bangalore, India',
          'manager': 'Arun kumar',
          'internal': 'Sudhakar Reddy',
          'date': 'Mar 01, 2020',
          'status': 'Completed'
        },
        {
          'id': 14,
          'orderNo': '1000784536714',
          'Customers': 'Dr.reddy’s',
          'Buyer': 'Unassigned',
          'Delivery': 'Pune, India',
          'manager': 'Rakesh A',
          'internal': 'Sudhakar Reddy',
          'date': 'Feb 25, 2020',
          'status': 'Completed'
        },
        {
          'id': 15,
          'orderNo': '1000123456715',
          'Customers': 'Ubuntu',
          'Buyer': 'Ramesh K',
          'Delivery': 'Hyderabad, India',
          'manager': 'Unassigned',
          'internal': 'Sudhakar Reddy',
          'date': 'Feb 25, 2020',
          'status': 'Placed with SLS'
        },
        {
          'id': 16,
          'orderNo': '1000123456716',
          'Customers': 'Dr.reddy’s',
          'Buyer': 'Unassigned',
          'Delivery': 'Pune, India',
          'manager': 'Rakesh A',
          'internal': 'Sudhakar Reddy',
          'date': 'Mar 05, 2020',
          'status': 'Completed'
        },
        {
          'id': 17,
          'orderNo': '1000849264717',
          'Customers': 'SLS',
          'Buyer': 'Sudhakar Reddy',
          'Delivery': 'Bangalore, India',
          'manager': 'Arun Kumar',
          'internal': 'Sudhakar Reddy',
          'date': 'Mar 03, 2020',
          'status': 'Placed with SLS'
        },
        {
          'id': 18,
          'orderNo': '1000784536718',
          'Customers': 'Dr.reddy’s',
          'Buyer': 'Unassigned',
          'Delivery': 'Hyderabad, India',
          'manager': 'Rakesh A',
          'internal': 'Sudhakar Reddy',
          'date': 'Feb 25, 2020',
          'status': 'Successful'
        },
        {
          'id': 19,
          'orderNo': '1000123456719',
          'Customers': 'Ubuntu',
          'Buyer': 'Ramesh K',
          'Delivery': 'Mumbai, India',
          'manager': 'UnAssigned',
          'internal': 'Sudhakar Reddy',
          'date': 'Feb 25, 2020',
          'status': 'Completed'
        },
        {
          'id': 20,
          'orderNo': '1000123456720',
          'Customers': 'Dr.reddy’s',
          'Buyer': 'Unassigned',
          'Delivery': 'Hyderabad, India',
          'manager': 'Rakesh A',
          'internal': 'Sudhakar Reddy',
          'date': 'Mar 05, 2020',
          'status': 'Completed'
        }]
    }
  },
  /**
     *click awy directives
     */
  directives: {
    onClickaway: onClickaway
  },
  computed: {
    statusConnt () {
      return this.count(this.orders)
    },
    rows () {
      return this.orders.length
    },
    sortOptions () {
      // Create an options list from our fields
      return this.fielast_namelds
        .filter(f => f.sortable)
        .map(f => {
          return {
            text: f.label,
            value: f.key
          }
        })
    }
  },
  mounted () {
    // Set the initial number of orders
    this.totalRows = this.orders.length
  },
  methods: {
    /**
     *click away method
     */
    sortfilter () {
      this.filterSection = false
    },
    /**
     *click away filtersearch
     */
    filterSearch () {
      this.filterSection = !this.filterSection
    },
    count (array) {
      let counts = array.reduce((out, {
        status
      }) => ({
        ...out,
        [status]: out[status] + 1 || 1
      }), {})
      return Object.keys(counts).map(key => ({
        status: key,
        count: counts[key]
      }))
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    /**
     * filter Reset
     */
    onReset (evt) {
      evt.preventDefault()
      this.form.Customer = null
      this.form.Pmanager = null
      this.form.Buying = null
      this.form.Internal = null
      this.form.from = null
      this.form.to = null
      this.$nextTick(() => {})
    },
    /**
     *filter Submit
     */
    onSubmit (evt) {
      evt.preventDefault()
      // this.filterOrderlist()
      console.log(JSON.stringify(this.form))
      // this.filterSection = false
    }
  }
}
