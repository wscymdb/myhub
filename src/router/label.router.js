const Koarouter = require('@koa/router')
const verifyToken = require('../middleware/token.middleware')
const labelController = require('../controller/label.controller')

const labelRouter = new Koarouter({ prefix: '/label' })

labelRouter.post('/', verifyToken, labelController.create)

module.exports = labelRouter
