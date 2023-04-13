const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
} = require('../config/error.config')
const userService = require('../service/user.service')
const md5EncryptPWD = require('../utils/encryptPWD')

const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body
  // 非空判断
  if (!name || !password)
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)

  // 数据库操作 查询是否重复
  const users = await userService.findUserByName(name)
  if (users.length) return ctx.app.emit('error', NAME_IS_ALREADY_EXISTS, ctx)

  await next()
}
// 将密码使用加密算法加密完毕后存储
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body

  let encryptPWD = md5EncryptPWD(password)

  ctx.request.body.password = encryptPWD

  await next()
}

module.exports = { verifyUser, handlePassword }
