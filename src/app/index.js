const Koa = require('koa')

//router
const userRouter = require('./../router/user_router')

const app = new Koa()

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

module.exports = app
