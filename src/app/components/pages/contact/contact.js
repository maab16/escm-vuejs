import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'
export default {
  middleware: 'auth',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      form: {
        name: null
      }
    }
  },
  methods: {

  }
}
