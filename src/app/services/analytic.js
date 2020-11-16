import AnalyticEntity from '@/Modules/Analytic/analytic.entity'
import Route from './route.class'

Route.get('/analytics/orders', AnalyticEntity, 'getAnalyticOrders')
Route.get('/analytics/popular/products', AnalyticEntity, 'getPopularProducts')
Route.get('/analytics/orders-by-month', AnalyticEntity, 'getOrdersByMonth')
Route.get('/analytics/company-distribution-data', AnalyticEntity, 'getCompanyDistributionData')
Route.get('/analytics/unavailable-orders', AnalyticEntity, 'getUnavailableOrdersByMonth')
Route.get('/analytics/buyer-orders', AnalyticEntity, 'getInternalBuyerOrdersByMonth')
Route.get('/analytics/unavailable-products', AnalyticEntity, 'getUnavailableProducts')
Route.get('/analytics/orders-by-status', AnalyticEntity, 'getOrdersByStatus')
