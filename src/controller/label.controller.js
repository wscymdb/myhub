const labelService = require('../service/label.service')

class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body

    if (!name) return

    const result = await labelService.create(name, ctx)
    if (result) {
      ctx.body = {
        code: 0,
        msg: '添加标签成功～',
      }
    }
  }
}

module.exports = new LabelController()
