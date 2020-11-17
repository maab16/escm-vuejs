import userMixin from '@/mixins/user'
import { mapActions } from 'vuex'

export default {
  mixins: [userMixin],
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
  methods: {
    ...mapActions('organization', [
      'verifyOrganization'
    ]),
    /**
     * Login admin click action
     */
    async loginAdmin () {
      if (await this.verifyOrganization(this.email) === true) {
        this.login = !this.login
        this.accountinfo = true
        this.error = ''
      } else if (this.getDomainFromEmail(this.email) === process.env.INTERNAL_USER_DOMAIN && await this.loginInternalUser(this.email) === true) {
        this.accountemail = this.email
        if (this.getOTP === null) {
          this.sendOTP(this.email)
        }

        console.log(this.getOTP)
        this.login = !this.login
        this.accountinfo = false
        this.verify = true
        this.error = ''
      } else {
        this.error = 'Please enter valid organization or internal user email.'
        window.toastr.error(this.error)
      }
    },
    /**
     * Login user click  action
     */
    async loginUsers () {
      if (this.getDomainFromEmail(this.email) === this.getDomainFromEmail(this.accountemail)) {
        if (await this.verifyCustomerUser({ email: this.accountemail, organization_email: this.email }) === true) {
          if (!this.getOTP) {
            this.sendOTP(this.accountemail)
          }
          // console.log(this.getOTP)
          this.accountinfo = false
          this.verify = true
          this.error = ''
        } else {
          this.newuser = true
          this.accountinfo = false
        }
      } else {
        this.error = 'Account email should be match with organization domain. Ex: ' + this.getDomainFromEmail(this.email)
        window.toastr.error(this.error)
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
      this.sendOTP(this.accountemail)
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
    async verifyOTP () {
      await this.verifyUser({
        email: this.accountemail,
        otp: this.otpdata
      })
      if (this.user) {
        this.setDefaultOTP()
        // this.setuser(this.accountemail)
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
      this.sendOTP(this.accountemail)
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
