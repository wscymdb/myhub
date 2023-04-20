const KoaRouter = require('@koa/router')
const userController = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')

// 路由对象
const userRouter = new KoaRouter({ prefix: '/users' })

// 路由映射
// 1. 用户注册接口
userRouter.post(
  '/registryUser',
  verifyUser,
  handlePassword,
  userController.create
)

// 为用户提供头像
userRouter.get('/avatar/:id', userController.showAvatarImage)
module.exports = userRouter
