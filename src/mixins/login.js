import userMixin from '@/mixins/user'
import { mapActions, mapGetters } from 'vuex'

export default {
  mixins: [userMixin],
  middleware: 'guest',
  data: () => ({
    email: '',
    accountemail: '',
    fname: '',
    lname: '',
    mobile: '',
    login: false,
    accountinfo: false,
    newuser: false,
    verify: false,
    otp: null,
    otpdata: '',
    isDisabled: false,
    isError: false,
    shouldResetOTP: false,
    otperror: false,
    verifyButton: true,
    dismissSecs: 5,
    dismissCountDown: 0,
    checkHide: false,
    status: false,
    acceptTerms: false,
    error: '',
    userData: {}
  }),
  computed: {
    ...mapGetters('organization', [
      'getOrganization',
      'getOrganizationIdByEmail'
    ])
  },
  methods: {
    ...mapActions('organization', [
      'setOrganization'
    ]),
    /**
     * Login admin click action
     */
    async loginAdmin () {
      if (this.getOrganization(this.email)) {
        this.login = !this.login
        this.accountinfo = true
        this.error = ''
      } else if (this.getDomainFromEmail(this.email) === process.env.INTERNAL_USER_DOMAIN && await this.loginInternalUser(this.email)) {
        this.accountemail = this.email
        this.userData = this.getUserByEmailWithOrganization(this.accountemail)

        if (this.userData != null) {
          if (this.getOTP === null) {
            this.sendOTP(this.userData)
          }

          console.log(this.getOTP)
          this.login = !this.login
          this.accountinfo = false
          this.verify = true
          this.error = ''
        }
      } else {
        this.error = 'Please enter valid organization or internal user email.'
      }
    },
    /**
     * Login user click  action
     */
    loginUsers () {
      if (this.getDomainFromEmail(this.email) === this.getDomainFromEmail(this.accountemail)) {
        this.userData = this.getUserByEmailWithOrganization(this.accountemail)

        if (this.userData != null) {
          if (this.userData.organization !== null && this.userData.organization.email === this.email) {
            if (this.getOTP === null) {
              this.sendOTP(this.userData)
            }
            // console.log(this.getOTP)
            this.accountinfo = false
            this.verify = true
            this.error = ''
          } else {
            this.error = 'Please enter valid account email.'
          }
        } else {
          this.newuser = true
          this.accountinfo = false
        }
      } else {
        this.error = 'Account email should be match with organization domain. Ex: ' + this.getDomainFromEmail(this.email)
      }
    },
    /**
     * After create user action
     */
    createnewUser () {
      this.acceptTerms = true
      this.$refs['my-modal'].show()
    },
    async userAccept () {
      this.userData = {
        organization_email: this.email,
        email: this.accountemail,
        fname: this.fname,
        lname: this.lname,
        mobile: this.mobile
      }
      this.createNewUser(this.userData)
      this.sendOTP(this.userData)
      // console.log(this.getOTP)
      this.newuser = false
      this.verify = true
      this.$refs['my-modal'].hide()
    },
    /**
     * Verify OTP
     */
    handleOnComplete (value) {
      this.otpdata = value
    },
    handleOnChange (value) {
      this.otpdata = value
      this.verifyButton = true
      if (this.otpdata.length >= 4) {
        this.verifyButton = false
      }
    },
    handleClearInput () {
      this.$refs.otpInput.clearInput()
    },
    verifyOTP () {
      if (Number(this.otpdata) === this.getOTP) {
        this.setDefaultOTP()
        this.setUserData(this.accountemail)
        this.otperror = false
        this.$router.push('home')
      } else {
        this.otperror = true
      }
      return this.otpdata
    },
    backlogin () {
      this.login = false
      this.verify = false
      this.email = ''
      this.accountemail = ''
      this.fname = ''
      this.lname = ''
      this.mobile = ''
      this.otpdata = ''
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    async showAlert () {
      this.sendOTP(this.userData)
      this.dismissCountDown = this.dismissSecs
      // console.log(this.getOTP)
    },
    printWindow: function () {
      window.print()
    },
    hideModal () {
      this.$refs['my-modal'].hide()
    }
  }
}
