import http from '@/app/services/localHttpCommon.js'
import User from '@/Modules/User/user.model'
// import Role from '@/Modules/Role/role.model'
import Product from '@/Modules/Product/product.model'
import Order from '@/Modules/Order/order.model'
import RequestDetails from '@/Modules/RequestDetails/request-details.model'
import Organization from '@/Modules/Organization/organization.model'
import RequestLine from '@/Modules/RequestDetails/request-line.model'
import moment from 'moment'
import UserService from '../User/user.service'
import ProductService from '../Product/product.service'
import OrderService from '../Order/order.service'
import RequestDetailsService from '../RequestDetails/request-details.service'
import RequestLineService from '../RequestDetails/request-line.service'

const ENDPOINT = 'analytics'

class AnalyticService {
  all () {
    return http.get(ENDPOINT)
  }
  store (data) {
    return http.post(ENDPOINT, data)
  }
  getAnalyticOrders (loggedUser, rootGetters) {
    let isManager = rootGetters['user/isManager']
    let isBuyingLead = rootGetters['user/isBuyingLead']
    let customerOrders = []

    User.insert({data: UserService.all()})
    Product.insert({data: ProductService.all()})
    Order.insert({data: OrderService.all()})
    RequestDetails.insert({data: RequestDetailsService.all()})

    let users = User.query().withAllRecursive().get()
    let query = Order.query().withAllRecursive()
    let userKey = ''
    if (isManager) {
      userKey = 'manager_id'
      query.where('manager_id', loggedUser.id)
    } else if (isBuyingLead) {
      userKey = 'buying_lead_id'
      query.where('buying_lead_id', loggedUser.id)
    }
    let orders = query.get()
    // let orders = {
    //   total: items.sort((order1, order2) => {
    //     return order1.total < order2.total ? 1 : order1.total > order2.total ? -1 : 0
    //   }),
    //   successful: items.map(order => {
    //     return order.status === 'successful' ? order : null
    //   }).filter(order => order),
    //   completed: items.map(order => {
    //     return order.status === 'completed' ? order : null
    //   }).filter(order => order),
    //   sls: items.map(order => {
    //     return order.status === 'sls' ? order : null
    //   }).filter(order => order),
    //   pending: items.map(order => {
    //     return order.status === 'pending' ? order : null
    //   }).filter(order => order)
    // }
    users.map(user => {
      let userOrders = user.orders.filter(order => {
        switch (userKey) {
          case 'buying_lead_id':
            return order.buying_lead_id === loggedUser.id ? order : null
          case 'manager_id':
            return order.manager_id === loggedUser.id ? order : null
          default:
            return order
        }
      })

      if (userOrders.length > 0) {
        customerOrders.push({
          name: user.fname + ' ' + user.lname,
          orders: userOrders,
          total: userOrders.length,
          successful: userOrders.filter(order => {
            if (isManager) {
              return (order.manager_id === loggedUser.id && order.status === 'successful') ? order : null
            } else if (isBuyingLead) {
              return (order.buying_lead_id === loggedUser.id && order.status === 'successful') ? order : null
            }
            return order.status === 'successful' ? order : null
          }),
          completed: userOrders.filter(order => {
            if (isManager) {
              return (order.manager_id === loggedUser.id && order.status === 'completed') ? order : null
            } else if (isBuyingLead) {
              return (order.buying_lead_id === loggedUser.id && order.status === 'completed') ? order : null
            }
            return order.status === 'completed' ? order : null
          }),
          sls: userOrders.filter(order => {
            if (isManager) {
              return (order.manager_id === loggedUser.id && order.status === 'sls') ? order : null
            } else if (isBuyingLead) {
              return (order.buying_lead_id === loggedUser.id && order.status === 'sls') ? order : null
            }
            return order.status === 'sls' ? order : null
          }),
          pending: RequestDetails
            .query()
            .withAllRecursive()
            .where('user_id', user.id)
            .get()
            .filter(orderDetail => {
              if (isManager) {
                return (orderDetail.order.manager_id === loggedUser.id) ? orderDetail : null
              } else if (isBuyingLead) {
                return (orderDetail.order.buying_lead_id === loggedUser.id) ? orderDetail : null
              }
              return orderDetail
            })
        })
      }
    })
    customerOrders = customerOrders.sort((order1, order2) => {
      return order1.total < order2.total ? 1 : order1.total > order2.total ? -1 : 0
    })

    return {
      orders,
      customerOrders
    }
  }
  getPopularProducts (user, rootGetters) {
    let isManager = rootGetters['user/isManager']
    let isBuyingLead = rootGetters['user/isBuyingLead']
    let userKey = ''

    if (isManager) {
      userKey = 'manager_id'
    } else if (isBuyingLead) {
      userKey = 'buying_lead_id'
    }

    Product.insert({data: ProductService.all()})
    return Product
      .query()
      .withAllRecursive()
      .get()
      .filter(product => {
        if (userKey) {
          product.orders = product.orders.filter(orderDetail => orderDetail.order[userKey] === user.id)
        }
        return product
      })
      .filter(product => product.orders.length > 0)
      .sort((product1, product2) => {
        return product1.orders.length < product2.orders.length
          ? 1 : product1.orders.length > product2.orders.length ? -1 : 0
      })
  }
  getOrdersByMonth (loggedUser, rootGetters) {
    let isManager = rootGetters['user/isManager']
    let isBuyingLead = rootGetters['user/isBuyingLead']
    let data = []

    for (let i = 6; i >= 0; i--) {
      let firstDay = moment().subtract(i, 'months').date(1)
      let lastDay = moment().subtract((i - 1), 'months').date(0)
      let from = firstDay.format('YYYY-MM-DD HH:mm:ss')
      let to = lastDay.format('YYYY-MM-DD HH:mm:ss')
      let query = Order.query()
      if (isManager) {
        query.where('manager_id', loggedUser.id)
      } else if (isBuyingLead) {
        query.where('buying_lead_id', loggedUser.id)
      }
      let orders = query.where('created_at', (value) => value >= from)
        .where('created_at', (value) => value <= to)
        .get()
      let completed = orders.filter(order => order.status === 'completed')
      let sls = orders.filter(order => order.status === 'sls')
      data.push({
        month: firstDay.format("MMM'YY"),
        completed: completed,
        sls: sls
      })
    }

    return data
  }
  getCompanyDistributionData (loggedUser, rootGetters) {
    let isManager = rootGetters['user/isManager']
    let isBuyingLead = rootGetters['user/isBuyingLead']
    let organizations = Organization.query().withAllRecursive().get()

    let data = []
    organizations.forEach(organization => {
      let total = 0
      organization.users.forEach(user => {
        let orders = user.orders.filter(order => {
          if (isManager) {
            return order.manager_id === loggedUser.id ? order : null
          } else if (isBuyingLead) {
            return order.buying_lead_id === loggedUser.id ? order : null
          }
          return order
        })
        total += orders.length
      })

      if (total > 0) {
        data.push({
          name: organization.name,
          total: total
        })
      }
    })

    return data.sort((company1, company2) => {
      return company1.total < company2.total
        ? 1 : company1.total > company2.total ? -1 : 0
    })
  }
  getUnavailableOrdersByMonth (loggedUser, rootGetters) {
    let data = []
    for (let i = 6; i >= 0; i--) {
      let firstDay = moment().subtract(i, 'months').date(1)
      let lastDay = moment().subtract((i - 1), 'months').date(0)
      let from = firstDay.format('YYYY-MM-DD HH:mm:ss')
      let to = lastDay.format('YYYY-MM-DD HH:mm:ss')
      let orders = RequestDetails
        .query()
        .withAllRecursive()
        .where('created_at', (value) => value >= from)
        .where('created_at', (value) => value <= to)
      // .where('delivered_at', (value) => value != null)
        .get()

      orders = orders.map(item => item['cas'])
        .map((item, index, final) => final.indexOf(item) === index && index)
        .filter(item => orders[item])
        .map(item => orders[item])

      data.push({
        month: firstDay.format("MMM'YY"),
        orders: orders.filter(orderDetail => {
          let isManager = rootGetters['user/isManager']
          let isBuyingLead = rootGetters['user/isBuyingLead']
          if (isManager) {
            return orderDetail.order.manager_id === loggedUser.id ? orderDetail : null
          } else if (isBuyingLead) {
            return orderDetail.order.buying_lead_id === loggedUser.id ? orderDetail : null
          }
          return orderDetail
        })
      })
    }
    return data
  }
  getInternalBuyerOrdersByMonth (loggedUser, rootGetters) {
    let isBuyingLead = rootGetters['user/isBuyingLead']
    let data = []
    let user = User.query()
      .withAllRecursive()
      .where('id', loggedUser.id)
      .first()
    if (user) {
      let orders = []
      let buyers = user.buyers
      if (!buyers || buyers.length < 1) {
        // buyers = Role.query().withAllRecursive().where('slug', 'internal-buyer').first().users
        buyers = User.query()
          .withAllRecursive()
          .with('roles', (query) => {
            query.where('slug', 'internal-buyer').orWhere('slug', 'buying-lead')
          })
          .get()
          .filter(userData => userData.roles.length > 0)
      }
      if (isBuyingLead) {
        data.push({
          name: user.fname + ' ' + user.lname,
          orders: user.bl_orders.filter(blOrder => !blOrder.internal_buyer_id)
        })
      }
      buyers.forEach(item => {
        let buyer = item
        if (isBuyingLead) {
          buyer = item.buyer
        }

        orders = buyer.ib_orders
        if (!isBuyingLead) {
          item.roles.forEach(role => {
            if (role.slug === 'buying-lead') {
              orders = buyer.bl_orders.filter(blOrd => !blOrd.internal_buyer_id)
            }
          })
        }
        if (isBuyingLead) {
          orders = orders.filter(order => order.buying_lead_id === loggedUser.id)
        }
        data.push({
          name: buyer.fname + ' ' + buyer.lname,
          orders: orders
        })
      })
    }
    return data
  }
  getCompanyDataByBuyer (loggedUser, rootGetters) {
    return this.getCompanyDistributionData(loggedUser, rootGetters)
  }
  getUnavailableProducts (user, rootGetters) {
    let isManager = rootGetters['user/isManager']
    let isBuyingLead = rootGetters['user/isBuyingLead']
    let userKey = ''

    if (isManager) {
      userKey = 'manager_id'
    } else if (isBuyingLead) {
      userKey = 'buying_lead_id'
    }

    let requests = RequestDetails.query()
      .withAllRecursive()
      .orderBy('updated_at', 'desc')
      .get()

    if (userKey) {
      requests = requests.filter(requestDetail => requestDetail.order[userKey] === user.id)
    }

    return requests.map(item => item['cas'])
      .map((item, index, final) => final.indexOf(item) === index && index)
      .filter(item => requests[item])
      .map(item => requests[item])
  }
  getOrdersByStatus (loggedUser, rootGetters, option, status) {
    console.log(option)
    let isManager = rootGetters['user/isManager']
    let isBuyingLead = rootGetters['user/isBuyingLead']
    RequestLine.insert({data: RequestLineService.all()})
    let query = Order.query().withAllRecursive()
    if (isManager) {
      query.where('manager_id', loggedUser.id)
    } else if (isBuyingLead) {
      query.where('buying_lead_id', loggedUser.id)
    }

    if (option.customer) {
      query.where('user_id', option.customer)
    }

    if (option.projectManager) {
      query.where('manager_id', option.projectManager)
    }

    if (option.buyingLead) {
      query.where('buying_lead_id', option.buyingLead)
    }

    if (option.internalBuyer) {
      query.where('internal_buyer_id', option.internalBuyer)
    }

    if (option.from) {
      query.where('created_at', (value) => value >= moment(option.from).format('YYYY-MM-DD HH:mm:ss'))
    }

    if (option.to) {
      query.where('created_at', (value) => value <= moment(option.to).format('YYYY-MM-DD HH:mm:ss'))
    }

    let results = []
    let orders = query.get()

    if (status === 'successful') {
      // orders.forEach(order => {
      //   order.products.forEach(product => {
      //     results.push(product)
      //   })
      // })

      return orders.filter(order => order.status === 'successful')
    }

    if (status === 'sls') {
      orders.forEach(order => {
        order.requests.forEach(request => {
          results.push(request)
        })
      })
    }

    if (status === 'completed') {
      orders.forEach(order => {
        order.requests.forEach(request => {
          request.lines = RequestLine
            .query()
            .withAllRecursive()
            .where('product_id', request.id)
            .where('order_id', order.id)
            .get()
            .filter(line => line.product_id === request.id && line.order_id === order.id)
          if (request.lines.length > 0) {
            results.push(request)
          }
        })
      })
    }
    if (status === 'pending') {
      orders.forEach(order => {
        order.requests.forEach(request => {
          request.lines = RequestLine
            .query()
            .withAllRecursive()
            .where('product_id', request.id)
            .where('order_id', order.id)
            .get()
            .filter(line => line.product_id === request.id && line.order_id === order.id)
          if (request.lines.length < 1) {
            results.push(request)
          }
        })
      })
    }
    return results
  }
  getPendingOrders (loggedUser, rootGetters, option) {
    let isManager = rootGetters['user/isManager']
    let isBuyingLead = rootGetters['user/isBuyingLead']
    let query = RequestDetails.query().withAllRecursive()
    if (option.customer) {
      query.where('user_id', option.customer)
    }
    if (option.from) {
      query.where('created_at', (value) => value >= moment(option.from).format('YYYY-MM-DD HH:mm:ss'))
    }

    if (option.to) {
      query.where('created_at', (value) => value <= moment(option.to).format('YYYY-MM-DD HH:mm:ss'))
    }
    let orders = query.get().filter(orderDetail => {
      if (isManager) {
        return orderDetail.order.manager_id === loggedUser.id ? orderDetail : null
      } else if (isBuyingLead) {
        return orderDetail.order.buying_lead_id === loggedUser.id ? orderDetail : null
      }
      return orderDetail
    })

    if (option.projectManager) {
      orders = orders.filter(orderDetail => {
        return orderDetail.order.manager_id === option.projectManager ? orderDetail : null
      })
    }

    if (option.buyingLead) {
      orders = orders.filter(orderDetail => {
        return orderDetail.order.buying_lead_id === option.buyingLead ? orderDetail : null
      })
    }
    if (option.internalBuyer) {
      orders = orders.filter(orderDetail => {
        return orderDetail.order.internal_buyer_id === option.internalBuyer ? orderDetail : null
      })
    }

    return orders
  }
}

export default new AnalyticService()
