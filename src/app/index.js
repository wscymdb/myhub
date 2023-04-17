const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

//router
const registerRouters = require('../router')

const app = new Koa()

// 中间件应用
app.use(bodyParser())
registerRouters(app) // 注册所有路由

module.exports = app
