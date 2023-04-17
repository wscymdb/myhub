const jwt = require('jsonwebtoken')
const { PRIVATEKEY } = require('../config/secret')

class LoginController {
  sign(ctx, next) {
    const { id, name } = ctx.user

    // 颁发token
    const token = jwt.sign({ id, name }, PRIVATEKEY, {
      expiresIn: 24 * 60 * 60, // 过期时间，单位s
      algorithm: 'RS256',
    })

    ctx.body = {
      code: 0,
      msg: '登陆成功～',
      data: { id, name, token },
    }
  }
}

module.exports = new LoginController()
