import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('user', [
      'user',
      'token',
      'check',
      'hasRole',
      'isAdmin',
      'isSupplierManager',
      'isManager',
      'isBuyingLead',
      'isInternalBuyer',
      'isCustomer',
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
      'verifyUser',
      'verifyCustomerUser',
      'logout',
      'setDefaultOTP'
    ])
  }
}
