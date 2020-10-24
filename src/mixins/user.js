import Order from '@/Modules/Order/order.model'
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'

const mixin = {
  computed: {
    ...mapGetters('user', [
      'user',
      'check',
      'hasRole',
      'isAdmin',
      'isSupplierManager',
      'isManager',
      'isBuyingLead',
      'isInternalBuyer',
      'isCustomer',
      'getUserByEmail',
      'getUserByEmailWithOrganuization',
      'getMaxId',
      'getOTP',
      'getNameFromEmail',
      'getDomainFromEmail'
    ])
  },
  methods: {
    ...mapActions('user', [
      'sendOTP',
      'createNewUser',
      'loginInternalUser',
      'logout',
      'setDefaultOTP',
      'setUserData'
    ])
  }
}

export default mixin
