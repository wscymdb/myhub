const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

//router
const userRouter = require('./../router/user.router')

const app = new Koa()

// 中间件应用
app.use(bodyParser())

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

module.exports = app
