import OrderEntity from '@/Modules/Order/order.entity'
import Route from './route'

// let http = axios.create({
//   baseURL: '/api',
//   headers: {
//     'Content-type': 'application/json'
//   }
// })

// var MockAdapter = require('axios-mock-adapter')

// var mock = new MockAdapter(http)

// mock.onGet('/orders').reply((config) => {
//   let orders = OrderEntity.getOrders(config.params)
//   return [200, {orders: orders}]
// })

Route.get('/orders/:id', OrderEntity, 'getOrder')
Route.get('/orders', OrderEntity, 'getOrders')
Route.post('/orders', OrderEntity, 'createOrder')
Route.put('/orders/:id', OrderEntity, 'updateOrder')
Route.put('/orders/lines/:id', OrderEntity, 'updateProductLines')

Route.get('buying-lead/buyers/:id', OrderEntity, 'getInternalBuyers')

// Route.bootstrap()

// mock.onGet(route('/orders/:email/verify/:id')).reply(function (config) {

//   console.log(config)
//   // the actual id can be grabbed from config.url

//   return [200, {}]
// })

// function route (path = '') {
//   return typeof path === 'string'
//     ? new RegExp(path.replace(/:\w+/g, '[^/]+'))
//     : path
// }

// mock.onPost('/orders').reply((config) => {

//   return [200, {orders: OrderService.all()}]
// })

// http.get('/orders').then(function (response) {
//   console.log(response.data)
// })
