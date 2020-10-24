<template>
  <p>Hello</p>
</template>

<script>
export default {
  name: 'relaod',
  data () {
    return {
      prevRoute: {
        path: ''
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.prevRoute = from
    })
  },
  afterRouteEnter (to, from, next) {
    next((vm) => {
      console.log(vm.prevRoute)
    })
    console.log(to, from, next)
  },
  created () {
    let args = this.$route.params.args !== null || this.$route.params.args !== undefined
      ? this.$route.params.args : null

    if (this.$route.params.name !== null) {
      if (args !== null) {
        this.$router.back()
      } else {
        this.$router.back()
      }
      
    }
    console.log(this.$route)
    // this.$router.push({name: 'cart'})
    // this.$router.back()
    // console.log(this.prevRoute)
    // console.log(this.$router.from)
    // this.$route.push('/cart')
  },
  mounted () {
    // console.log(this.prevRoute)
  },
  watch: {
    $route (to, from, ...args) {
      console.log(from)
    }
  }
}
</script>
