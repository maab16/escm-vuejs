import http from '@/app/services/httpClient.js'
import ProductEntity from './product.entity'

const ENDPOINT = 'products'

class ProductService {
  async checkAvailabilty (carts) {
    let response = await http.get(ENDPOINT + '/check-availability', { params: {carts} })
    return response.data
  }
  async getSearchKeywords (search) {
    let response = await http.get(ENDPOINT + '/keywords', { params: {search, limit: process.env.SEARCH_LIMIT} })
    return response.data
  }
  async getAdvancedSearchProducts (data) {
    let response = await http.get(ENDPOINT + '/filter', { params: {data} })
    return response.data
  }
  // Only for frontend
  getProducts (data) {
    return ProductEntity.getProducts(data)
  }
  getProductsByCas (cas) {
    return ProductEntity.getProductsByCas(cas)
  }
  getAdavacedOptions (tags, option) {
    return ProductEntity.getAdavacedOptions(tags, option)
  }
}

export default new ProductService()
