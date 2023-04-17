const momentService = require('../service/moment.service')

class MomentController {
  async create(ctx, next) {
    const { id } = ctx.tokenInfo
    const { content } = ctx.request.body

    if (!content) return

    const result = await momentService.create({ id, content }, ctx)
    if (result) {
      ctx.body = {
        code: 0,
        msg: '添加成功～',
      }
    }
  }
}

module.exports = new MomentController()
