import { mapActions, mapGetters } from 'vuex'

export default {
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
