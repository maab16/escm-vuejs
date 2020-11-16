import ProductEntity from '@/Modules/Product/product.entity'
import Route from './route.class'

Route.get('/products/keywords', ProductEntity, 'getSearchKeywords')
Route.get('/products/filter', ProductEntity, 'getAdvancedSearchProducts')
Route.get('/products/check-availability', ProductEntity, 'checkAvailabilty')
