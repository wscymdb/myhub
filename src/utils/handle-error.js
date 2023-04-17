const app = require('../app')
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  UNKNOW_ERROR,
  NAME_OR_PASSWORD_IS_INCORRECT,
  UNAUTHORIZATION,
} = require('../config/error.config')

app.on('error', (error, ctx) => {
  let code = 0
  let msg = ''
  console.log(error)
  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001
      msg = '用户名或密码不能为空～'
      break

    case NAME_IS_ALREADY_EXISTS:
      code = -1002
      msg = '用户名已经被占用,请重新输入～'
      break

    case NAME_OR_PASSWORD_IS_INCORRECT:
      code = -1003
      msg = '用户名或密码错误，请重新输入～'
      break

    case UNAUTHORIZATION:
      code = -1004
      msg = '无效的token～'
      break

    case UNKNOW_ERROR:
      code = -1111
      msg = '未知错误，请联系管理员～'
      break
  }
  console.log(code, msg)
  ctx.body = {
    code,
    msg,
  }
})
