import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'
import Loginsliders from './login-sliders/loginSlider.vue'
import Logo from '../../common/logo/logo.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  middleware: 'guest',
  components: {
    'app-loginslider': Loginsliders,
    ValidationObserver,
    ValidationProvider,
    'app-logo': Logo
  },
  mounted () {
    this.$root.$on('clickedSomething', () => {
    })

    // window.addEventListener('keyup', event => {
    //   if (event.keyCode === 13) {
    //     this.verifyOTP()
    //   }
    // })
  },
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
    user: {}
  }),
  computed: {
    ...mapGetters('organization', [
      'getOrganization',
      'getOrganizationIdByEmail'
    ]),
    ...mapGetters('user', [
      'getUserByEmailWithOrganuization',
      'getMaxId',
      'getOTP',
      'getDomainFromEmail'
    ])
  },
  methods: {
    ...mapActions('organization', [
      'setOrganization'
    ]),
    ...mapActions('user', [
      'createNewUser',
      'loginInternalUser',
      'sendOTP',
      'setDefaultOTP',
      'setUserData'
    ]),
    /**
     * Login admin click action
     */
    async loginAdmin () {
      console.log(await this.loginInternalUser(this.email))
      if (this.getOrganization({email: this.email}) !== null) {
        this.login = !this.login
        this.accountinfo = true
        this.error = ''
      } else if (this.getDomainFromEmail(this.email) === 'sailife.com' && await this.loginInternalUser(this.email)) {
        this.accountemail = this.email
        this.user = this.getUserByEmailWithOrganuization(this.accountemail)

        if (this.user != null) {
          if (this.getOTP === null) {
            this.sendOTP(this.user)
          }

          console.log(this.getOTP)
          this.login = !this.login
          this.accountinfo = false
          this.verify = true
          this.error = ''
        }
      } else {
        this.error = 'Please enter valid organization email.'
      }
    },
    /**
     * Login user click  action
     */
    loginUsers () {
      if (this.getDomainFromEmail(this.email) === this.getDomainFromEmail(this.accountemail)) {
        this.user = this.getUserByEmailWithOrganuization(this.accountemail)

        if (this.user != null) {
          if (this.user.organization !== null && this.user.organization.email === this.email) {
            if (this.getOTP === null) {
              this.sendOTP(this.user)
            }

            console.log(this.getOTP)

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
      this.user = {
        id: this.getMaxId + 1,
        organization_id: this.getOrganizationIdByEmail(this.email),
        email: this.accountemail,
        fname: this.fname,
        lname: this.lname,
        mobile: this.mobile
      }
      this.createNewUser(this.user)
      this.sendOTP(this.user)
      console.log(this.getOTP)
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
      this.sendOTP(this.user)
      this.dismissCountDown = this.dismissSecs
      console.log(this.getOTP)
    },
    printWindow: function () {
      window.print()
    },
    hideModal () {
      this.$refs['my-modal'].hide()
    }
  }
}
