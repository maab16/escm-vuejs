// import axios from 'axios'

// export default axios.create({
//   baseURL: 'https://demo7335314.mockable.io/',
//   headers: {
//     'Content-type': 'application/json'
//   }
// })

import { http } from './route'
require('./routes')

class Storage {
  get (endpoint, id = null) {
    let results = localStorage.getItem(endpoint) != null
      ? JSON.parse(localStorage.getItem(endpoint))
      : []
    if (id) {
      results = results.filter(result => result.id === id)
    }
    return results
  }
  post (endpoint, data = []) {
    localStorage.setItem(endpoint, JSON.stringify(data))
    return data
  }
  put (endpoint, data) {
    let results = this.get(endpoint)
    results = results.map(result => {
      if (result.id === data.id) {
        return {...data}
      }
      return result
    })
    localStorage.setItem(endpoint, JSON.stringify(results))
    return data
  }
}

export let storage = new Storage()

export default http
