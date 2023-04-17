const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

//router
const userRouter = require('./../router/user.router')
const loginRouter = require('./../router/login.router')

const app = new Koa()

// 中间件应用
app.use(bodyParser())

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())
app.use(loginRouter.routes())
app.use(loginRouter.allowedMethods())

module.exports = app
