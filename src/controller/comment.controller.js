const commentService = require('../service/comment.service')

class CommentController {
  async create(ctx, next) {
    const { content, momentId } = ctx.request.body

    if (!content || !momentId) return
    const result = await commentService.create(ctx)
    if (result) {
      ctx.body = {
        code: 0,
        msg: '添加成功～',
      }
    }
  }

  async reply(ctx, next) {
    const { content, momentId, commentId } = ctx.request.body

    if (!content || !momentId || !commentId) return
    const result = await commentService.reply(ctx)
    if (result) {
      ctx.body = {
        code: 0,
        msg: '回复成功～',
      }
    }
  }
}

module.exports = new CommentController()
