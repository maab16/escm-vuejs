import { mapActions, mapGetters } from 'vuex'
import orderDetails from '@/mixins/order-details'

export default {
  middleware: 'auth',
  mixins: [orderDetails],
  props: ['id'],
  components: {},
  data () {
    return {
      hideCard: true,
      selected: 'Placed with SLS',
      statusProject: 'Placed with SLS',
      options: [{
        text: 'Placed with SLS',
        value: 'Placed with SLS'
      },
      {
        text: 'Completed',
        value: 'Completed'
      }
      ],
      ordernum: this.$route.params.id,
      ordersList: [],
      orderFields: [{
        key: 'id',
        label: 'S.No'
      },
      {
        key: 'products',
        label: 'Product Setails'
      },
      {
        key: 'Quality',
        label: 'Quantity'
      },
      {
        key: 'Supplier',
        label: 'Supplier'
      },
      {
        key: 'Unitprice',
        label: 'Unit Price'
      },
      {
        key: 'Subtotal',
        label: 'Sub Total'
      },
      {
        key: 'status',
        label: 'Status'
      },
      {
        key: 'actions',
        label: 'Actions'
      }
      ],
      orderDetails: [{
        id: 1,
        products: {
          badge: '4782-25-6',
          pname: 'Calcium Carbonate',
          pcode: 'CaCO',
          pure: '95%',
          package: '5 gm'
        },
        Quality: 5,
        Supplier: 'Combiblocks',
        Unitprice: {
          price: '$ 06.00',
          INR: 'In INR: 423.00'
        },
        Subtotal: {
          price: '$ 24',
          INR: 'In INR: 1,692.00'
        },
        status: 'Requested SLS to order',
        Pr: 1000054321,
        po: 1000012345
      },
      {
        id: 2,
        products: {
          badge: '4782-25-6',
          pname: 'Calcium Carbonate',
          pcode: 'CaCO',
          pure: '95%',
          package: '5 gm'
        },
        Quality: 2,
        Supplier: 'Combiblocks',
        Unitprice: {
          price: '$ 06.00',
          INR: 'In INR: 423.00'
        },
        Subtotal: {
          price: '$ 24',
          INR: 'In INR: 1,692.00'
        },
        status: 'Order Placed',
        Pr: 1000054321,
        po: 1000012345
      }
      ],

      RequestList: [{
        id: 1,
        products: {
          badge: '4782-25-6',
          pname: 'Calcium Carbonate',
          pcode: 'CaCO',
          pure: '95%',
          package: '5 gm'
        },
        orderserv: [{
          id: 1,
          Quality: 3,
          Supplier: 'Combiblocks',
          Unitprice: '$ 06.00',
          Unitinr: '423.00',
          Subprice: '$ 24',
          Subinr: '3456.00',
          status: 'Requested SLS to order',
          Pr: 1000054321,
          po: 1000012345
        },
        {
          id: 2,
          Quality: 2,
          Supplier: 'Combiblocks',
          Unitprice: '$ 06.00',
          Unitinr: '423.00',
          Subprice: '$ 24',
          Subinr: '3456.00',
          status: 'Requested SLS to order',
          Pr: 1000054321,
          po: 1000012345
        }
        ]
      }],
      projectManagers: ['Arun', 'Varun'],
      buyingLeads: ['Rakesh', 'Anil'],
      internalBuyers: ['Sudhkar Reddy', 'Anil'],
      updateorderDetail: false,
      recentDelted: true,
      selectcheck: [],
      ordercheck: true,
      message: ''
    }
  },
  computed: {
    ...mapGetters('role', [
      'roles'
    ]),
    ...mapGetters('order', [
      'order'
    ]),
    ...mapGetters('product', [
      'currency'
    ]),
    total: function () {
      let amount = 0
      this.order.products.forEach(product => {
        amount += product[this.currency] * product.pivot.qty
      })
      return amount
    }
  },
  mounted () {
    this.ordersList = this.order.products
    console.log(this.order)
  },
  created () {
    this.retrieveOrderList()
    this.RequestList = this.order.products
    this.selectcheck = this.orderDetails
  },
  methods: {
    ...mapActions('role', [
      'fetchRoles'
    ]),
    ...mapActions('order', [
      'fetchOrderDetails',
      'updateOrderDeatils',
      'updateOrder',
      'updateOrderHistory'
    ]),
    ...mapActions('comment', [
      'saveComment'
    ]),
    showProjectManagerModal () {
      this.$refs['project-manager-modal'].show()
    },
    showUpdateModal (item) {
      this.RequestList = []
      this.RequestList.push(item)
      this.$refs['cart-update-modal'].show()
    },
    async changeOrderDetails (order, type, modal) {
      let message = ''
      if (type === 'internal-buyer') {
        this.internalBuyers.forEach(buyer => {
          if (buyer.value == order.internal_buyer_id) {
            message = 'Internal Buyer assigned: <strong>' + buyer.text + '</strong>'
          }
        })
      }
      if (type === 'project-manager') {
        this.projectManagers.forEach(manager => {
          if (manager.value == order.manager_id) {
            message = 'Project Manager assigned: <strong>' + manager.text + '</strong>'
          }
        })
      }
      if (type === 'buying-lead') {
        this.buyingLeads.forEach(lead => {
          if (lead.value == order.buying_lead_id) {
            message = 'Buying Lead assigned: <strong>' + lead.text + '</strong>'
          }
        })
      }
      await this.updateOrderHistory({
        order,
        message: message
      })
      await this.updateOrder(order)
      this.retrieveOrderList()
      this.$refs[modal].hide()
    },
    async updateDeatils () {
      await this.updateOrderDeatils(this.RequestList)
      await this.fetchOrderDetails(this.$route.params.id)
    },
    async comment () {
      await this.saveComment({
        order_id: this.order.id,
        message: this.message
      })
      this.message = ''
      await this.fetchOrderDetails(this.$route.params.id)
    },
    /**
     * order All select
     */
    checkAll () {
      this.ordercheck = !this.ordercheck
      this.selectcheck = []
      if (this.ordercheck) { // Check all
        for (var data in this.orderDetails) {
          this.selectcheck.push(this.orderDetails[data])
        }
        this.recentDelted = true
      } else {
        this.recentDelted = false
      }
    },
    /**
     * order single select
     */
    updateCheckall () {
      console.log(this.selectcheck)
      console.log(this.orderDetails)
      if (this.selectcheck.length === this.orderDetails.length) {
        this.ordercheck = true
      } else {
        this.ordercheck = false
        this.recentDelted = true
      }
    },
    /**
     * Add pr number
     **/
    addExperience () {
      this.RequestList.forEach(element => {
        element.orderserv.push({
          Quality: '',
          Supplier: '',
          Unitprice: '',
          subprice: '',
          Pr: '',
          po: ''
        })
      })
    },
    /**
     * submit add pr number
     **/
    submitProduct () {
      const data = {
        RequestList: this.RequestList
      }
      console.log(JSON.stringify(data))
      this.updateOrder()
    },
    /**
     * hidedetails Card
     **/
    hideRequestCard () {
      this.hideCard = !this.hideCard
    },
    /**
     * updateOrder Details
     **/
    async retrieveOrderList () {
      await this.fetchRoles()
      await this.fetchOrderDetails(this.id)
      this.roles.forEach(role => {
        if (role.slug === 'project-manager') {
          this.projectManagers = []
          role.users.map(user => {
            this.projectManagers.push({
              value: user.id,
              text: user.fname + ' ' + user.lname
            })
          })
        } else if (role.slug === 'buying-lead') {
          this.buyingLeads = []
          role.users.map(user => {
            this.buyingLeads.push({
              value: user.id,
              text: user.fname + ' ' + user.lname
            })
          })
        } else if (role.slug === 'internal-buyer') {
          this.internalBuyers = []
          role.users.map(user => {
            this.internalBuyers.push({
              value: user.id,
              text: user.fname + ' ' + user.lname
            })
          })
        }
      })
      console.log(this.order)
      // OrderDataService.getOrdersAll()
      //   .then(response => {
      //     this.ordersList = response.data
      //   })
      //   .catch(e => {
      //     console.log(e)
      //   })
    },
    printWindow: function () {
      window.print()
    },
    showModal () {
      this.$refs['my-modal'].hide()
      this.statusProject = this.selected
    },
    openModal (ref) {
      this.$refs[ref].show()
    },
    hideModal (ref) {
      this.$refs[ref].hide()
    },
    managerShow () {
      this.$refs['my-modal'].hide()
      this.managerStatus = this.manageName
    },
    buyingShow () {
      this.$refs['my-modal'].hide()
      this.buyStatus = this.buyName
    },
    internalshow () {
      this.$refs['my-modal'].hide()
      this.internalStatus = this.internalname
    }
  }
}
