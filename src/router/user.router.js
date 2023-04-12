const KoaRouter = require('@koa/router')
const userController = require('../controller/user.controller')

// 路由对象
const userRouter = new KoaRouter({ prefix: '/users' })

// 路由映射
// 1. 用户注册接口
userRouter.post('/registryUser', userController.create)

module.exports = userRouter
