import http from '@/app/services/httpClient.js'

const ENDPOINT = 'analytics'

class AnalyticService {
  async getAnalyticOrders (loggedUser, rootGetters) {
    let response = await http.get(ENDPOINT + '/orders', { params: {loggedUser, rootGetters} })
    return response.data
  }
  async getPopularProducts (user, rootGetters) {
    let response = await http.get(ENDPOINT + '/popular/products', { params: {user, rootGetters} })
    return response.data
  }
  async getOrdersByMonth (loggedUser, rootGetters) {
    let response = await http.get(ENDPOINT + '/orders-by-month', { params: {loggedUser, rootGetters} })
    return response.data
  }
  async getCompanyDistributionData (loggedUser, rootGetters) {
    let response = await http.get(ENDPOINT + '/company-distribution-data', { params: {loggedUser, rootGetters} })
    return response.data
  }
  async getUnavailableOrdersByMonth (loggedUser, rootGetters) {
    let response = await http.get(ENDPOINT + '/unavailable-orders', { params: {loggedUser, rootGetters} })
    return response.data
  }
  async getInternalBuyerOrdersByMonth (loggedUser, rootGetters) {
    let response = await http.get(ENDPOINT + '/buyer-orders', { params: {loggedUser, rootGetters} })
    return response.data
  }
  getCompanyDataByBuyer (loggedUser, rootGetters) {
    return this.getCompanyDistributionData(loggedUser, rootGetters)
  }
  async getUnavailableProducts (user, rootGetters) {
    let response = await http.get(ENDPOINT + '/unavailable-products', { params: {user, rootGetters} })
    return response.data
  }
  async getOrdersByStatus (loggedUser, rootGetters, option, status) {
    let response = await http.get(ENDPOINT + '/orders-by-status', { params: {loggedUser, rootGetters, option, status} })
    return response.data
  }
}

export default new AnalyticService()
