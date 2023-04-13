const userService = require('../service/user.service')

class UserController {
  async create(ctx, next) {
    // 获取客户端数据
    const info = ctx.request.body
    // 数据库操作 添加用户
    const result = await userService.create(info, ctx)
    if (result) {
      ctx.body = result
    }
  }
}

module.exports = new UserController()
