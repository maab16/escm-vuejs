import recentUpdates from './recent-updates/recentUpdates.vue'
import recentorders from './recent-orders/recentOrders.vue'

export default {
  middleware: 'auth',
  name: 'RecentPage',
  components: {
    'app-Updates': recentUpdates,
    'app-orders': recentorders
  }
}
