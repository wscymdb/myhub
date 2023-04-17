const KoaRouter = require('@koa/router')
const loginController = require('../controller/login.controller')
const verifyPassword = require('../middleware/login.middleware')

const loginRouter = new KoaRouter({ prefix: '/login' })

loginRouter.post('/', verifyPassword, loginController.sign)

module.exports = loginRouter
