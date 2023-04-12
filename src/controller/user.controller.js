const userService = require('../service/user.service')

class UserController {
  create(ctx, next) {
    // 获取客户端数据
    const info = ctx.request.body

    // 数据库操作
    userService.create(info)

    ctx.body = 123
  }
}

module.exports = new UserController()
