import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

let httpClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-type': 'application/json'
  }
})

const mock = new MockAdapter(httpClient)

class Route {
  get (path, controller, action) {
    mock.onGet(this.getPath(path)).reply((config) => {
      let result = controller[action](this.getParams(path, config))
      return [200, result]
    })
  }
  post (path, controller, action) {
    mock.onPost(this.getPath(path)).reply((config) => {
      let order = controller[action](JSON.parse(config.data))
      return [200, order]
    })
  }
  put (path, controller, action) {
    mock.onPut(this.getPath(path)).reply((config) => {
      let order = controller[action](JSON.parse(config.data))
      return [200, order]
    })
  }
  delete (path, controller, action) {
    mock.onDelete(this.getPath(path)).reply((config) => {
      let order = controller[action](this.getParams(path, config))
      return [200, order]
    })
  }
  getParams (path, config) {
    let placeholers = path.split('/').filter(match => match)
    let partials = config.url.split('/').filter(partial => partial)
    let params = {}
    placeholers.map((placeholer, index) => {
      if (placeholer.indexOf(':') > -1) {
        let param = placeholer.replace(':', '')
        params[param] = partials[index]
      }
    })
    if (config.params) {
      return {...params, ...config.params}
    }
    return {...params}
  }
  getPath (path) {
    return typeof path === 'string'
      ? new RegExp(path.replace(/:\w+/g, '[^/]+'))
      : path
  }
}

export default new Route()

export let http = httpClient
