import http from '@/app/services/localHttpCommon.js'
import Comment from '@/Modules/Comment/comment.model'
import moment from 'moment'

const ENDPOINT = 'comments'

class CommentService {
  all () {
    return http.get(ENDPOINT)
  }
  store (data) {
    return http.post(ENDPOINT, data)
  }
  addOrderComment (user, data) {
    console.log(data)
    let comments = this.all()
    comments.push({
      id: Comment.query().max('id') > 0 ? Comment.query().max('id') + 1 : 1,
      order_id: data.order_id,
      user_id: user.id,
      message: data.message,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    this.store(comments)
    Comment.insert({data: comments})
    return Comment.query().withAllRecursive().where('order_id', data.order_id).get()
  }
}

export default new CommentService()
