const KoaRouter = require('@koa/router')
const verifyToken = require('../middleware/token.middleware')
const momentController = require('../controller/moment.controller')

const momentRouter = new KoaRouter({ prefix: '/moment' })

//创建动态
momentRouter.post('/', verifyToken, momentController.create)

module.exports = momentRouter
