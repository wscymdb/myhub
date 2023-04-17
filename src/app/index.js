const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

//router
const userRouter = require('./../router/user.router')
const loginRouter = require('./../router/login.router')
const registerRouters = require('../router')

const app = new Koa()

// 中间件应用
app.use(bodyParser())
registerRouters(app)

module.exports = app
