const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_OR_PASSWORD_IS_INCORRECT,
} = require('../config/error.config')
const userService = require('../service/user.service')
const md5EncryptPWD = require('../utils/encryptPWD')

async function verifyPassword(ctx, next) {
  // 用户名和密码非空验证
  const { name, password } = ctx.request.body
  if (!name || !password)
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)

  // 数据库查询是否有该用户
  const [user] = await userService.findUserByName(name)
  if (!user) return ctx.app.emit('error', NAME_OR_PASSWORD_IS_INCORRECT, ctx)

  // 判断密码是否正确
  if (user.password !== md5EncryptPWD(password))
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_INCORRECT, ctx)
  ctx.user = user
  await next()
}

module.exports = verifyPassword
