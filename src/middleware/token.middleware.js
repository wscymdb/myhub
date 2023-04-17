const { UNAUTHORIZATION } = require('../config/error.config')
const { PUBLICKEY } = require('../config/secret')
const jwt = require('jsonwebtoken')

async function verifyToken(ctx, next) {
  // 是否携带token
  const { authorization } = ctx.header
  if (!authorization) return ctx.app.emit('error', UNAUTHORIZATION, ctx)
  // 替换掉Bearer
  const token = authorization.replace('Bearer ', '')

  // 验证token是否有效
  try {
    const result = jwt.verify(token, PUBLICKEY)
    ctx.tokenInfo = result
    await next()
  } catch (error) {
    console.log(error)
    ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
}

module.exports = verifyToken
