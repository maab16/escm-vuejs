import user from '@/mixins/user'

export default {
  data () {
    return {
      fields: [{
        key: 'cas',
        label: 'CAS No.',
        sortable: true
      },
      {
        key: 'description',
        label: 'Product Name',
        sortable: true
      },
      {
        key: 'qty',
        label: 'Quantity',
        sortable: true
      },
      {
        key: 'customer',
        label: 'Customer',
        sortable: true
      },
      {
        key: 'user',
        label: 'Requested By',
        sortable: true
      },
      {
        key: 'internal_buyer',
        label: 'Internal Buyer',
        sortable: true
      },
      {
        key: 'order_id',
        label: 'Related Order ID.',
        sortable: true
      },
      {
        key: 'delivery_at',
        label: 'Delivery Date',
        sortable: true
      },
      {
        key: 'created_at',
        label: 'Order Date',
        sortable: true
      },
      {
        key: 'actions',
        label: 'Actions',
        sortable: true
      }
      ]
    }
  }
}
