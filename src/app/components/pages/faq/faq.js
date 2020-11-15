import { mapGetters, mapActions } from 'vuex'

export default {
  middleware: 'auth',
  computed: {
    ...mapGetters('faq', [
      'faqs'
    ])
  },
  mounted () {
    this.setFaqs()
  },
  methods: {
    ...mapActions('faq', [
      'setFaqs'
    ])
  }
}
