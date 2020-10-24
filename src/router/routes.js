import home from '@/app/components/pages/home/home.vue'
import order from '@/app/components/pages/order/order.vue'
import login from '@/app/components/auth/login/login.vue'
import notfound from '@/app/components/common/notfound/notfound.vue'
import searchResult from '@/app/components/pages/home/search-item/searchItem.vue'
import recentUpdates from '@/app/components/pages/home/recent-updatesdetail/recentUpdatesdetails.vue'
import cartList from '@/app/components/pages/cart/cart.vue'
import reload from '@/app/components/pages/cart/reload.vue'
import checkout from '@/app/components/pages/cart/checkout-cart/checkout.vue'
import orderList from '@/app/components/pages/order/order-list/orderList.vue'
import orderDetail from '@/app/components/pages/order/order-details/orderDetail.vue'
import requestProduct from '@/app/components/pages/request-product/requestProduct.vue'
import analyticsReport from '@/app/components/pages/analytics-report/analyticsReport.vue'
import analyticsList from '@/app/components/pages/analytics-report/analytics-list/analyticsList.vue'
import analyticsDetails from '@/app/components/pages/analytics-report/analytics-details/analyticsDetails.vue'
import successfulOrders from '@/app/components/pages/analytics-report/successful-orders/successfulOrders.vue'
import placedSLSOrders from '@/app/components/pages/analytics-report/placed-sls-orders/placedSLSOrders.vue'
import completedOrders from '@/app/components/pages/analytics-report/completed-orders/completedOrders.vue'
import internalBuyerOrders from '@/app/components/pages/analytics-report/internal-buyer-orders/internalBuyerOrders.vue'
import unavailableProducts from '@/app/components/pages/analytics-report/unavailable-products/unavailableProducts.vue'
import comment from '@/app/components/pages/order/comment/comment.vue'
import contact from '@/app/components/pages/contact/contact.vue'
import faq from '../app/components/pages/faq/faq.vue'

const routes = [{
  path: '/',
  name: 'login',
  component: login
},
{
  path: '/home',
  component: home,
  name: 'home',
  props: true,
  children: [
    { path: '', component: searchResult },
    { path: 'updates', component: recentUpdates }
  ]
},
{
  path: '/order',
  component: order,
  children: [
    { path: '', component: orderList },
    { path: 'order-detail/:id', component: orderDetail, name: 'order-detail', props: true },
    { path: 'comment', component: comment }
  ]
},
{
  path: '/request-product',
  name: 'RequestProduct',
  component: requestProduct
},
{
  path: '/analytics',
  name: 'analytics',
  component: analyticsReport,
  children: [
    { path: '', component: analyticsList },
    { path: 'analtics-detail', component: analyticsDetails },
    { path: 'successful-orders', component: successfulOrders },
    { path: 'placed-sls-orders', component: placedSLSOrders },
    { path: 'completed-orders', component: completedOrders },
    { path: 'internal-buyer-orders', component: internalBuyerOrders },
    { path: 'unavailable-products', component: unavailableProducts }
  ]
},
{
  path: '/cart',
  name: 'cart',
  component: cartList,
  meta: { requiresAuth: true }
},
{
  path: '/reload/:name',
  name: 'reload',
  component: reload,
  meta: { requiresAuth: true }
},
{
  path: '/checkout',
  name: 'checkout',
  component: checkout,
  props: true
},
{
  path: '/contact',
  component: contact,
  name: 'contact'
},
{
  path: '/faq',
  component: faq,
  name: 'faq'
},
{
  path: '*',
  component: notfound
}
]

export default routes
