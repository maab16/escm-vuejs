import * as types from './mutation-types'
import Comment from '@/Modules/Comment/comment.model'
import moment from 'moment'

const state = {
  comments: []
}
const mutations = {
  [types.SAVE_COMMENT] (state, comments) {
    state.comments = comments
    localStorage.setItem('comments', JSON.stringify(comments))
  }
}
const actions = {
  async saveComment ({commit, rootGetters}, payload) {
    let comments = localStorage.getItem('comments') != null
      ? JSON.parse(localStorage.getItem('comments'))
      : []
    let user = rootGetters['user/user']
    if (user) {
      comments.push({
        id: Comment.query().max('id') > 0 ? Comment.query().max('id') + 1 : 1,
        order_id: payload.order_id,
        user_id: user.id,
        message: payload.message,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
      })
      commit(types.SAVE_COMMENT, comments)
    }
  }
}

const getters = {
  comments: (state) => state.comments
}

export default {
  state,
  mutations,
  actions,
  getters
}
