import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import database from '@/database'

Vue.use(Vuex)

// Load store modules dynamically.
const requireContext = require.context('../Modules', true, /.*.store.js$/, 'sync')

const modules = requireContext.keys()
  .map(file =>
    [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
  )
  .reduce((modules, [name, module]) => {
    if (module.namespaced === undefined) {
      module.namespaced = true
    }

    return { ...modules, [name]: module }
  }, {})

export default new Vuex.Store({
  plugins: [VuexORM.install(database)],
  state: {},
  mutations: {},
  actions: {},
  modules
})
