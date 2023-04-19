const connection = require('../app/database')
const { UNKNOW_ERROR } = require('../config/error.config')

class CommentService {
  async create(ctx) {
    try {
      const { content, momentId } = ctx.request.body
      const { id } = ctx.tokenInfo

      const sql = `INSERT INTO comment(content,moment_id,user_id) VALUES (?,?,?)`

      const [value] = await connection.execute(sql, [content, momentId, id])
      if (value.affectedRows > 0) {
        return true
      } else {
        ctx.app.emit('error', UNKNOW_ERROR, ctx)
        return false
      }
    } catch (error) {
      console.log(error, 'commentController')
      ctx.app.emit('error', UNKNOW_ERROR, ctx)
    }
  }

  async reply(ctx) {
    try {
      const { content, momentId, commentId } = ctx.request.body
      const { id } = ctx.tokenInfo

      const sql = `INSERT INTO comment(content,moment_id,user_id,comment_id) VALUES (?,?,?,?)`

      const [value] = await connection.execute(sql, [
        content,
        momentId,
        id,
        commentId,
      ])
      if (value.affectedRows > 0) {
        return true
      } else {
        ctx.app.emit('error', UNKNOW_ERROR, ctx)
        return false
      }
    } catch (error) {
      console.log(error, 'commentController')
      ctx.app.emit('error', UNKNOW_ERROR, ctx)
    }
  }
}

module.exports = new CommentService()
