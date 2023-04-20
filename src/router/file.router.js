const KoaRouter = require('@koa/router')

const verifyToken = require('../middleware/token.middleware')
const { handleAvatar } = require('../middleware/file.middleware')
const fileController = require('../controller/file.controller')

// 路由对象
const fileRouter = new KoaRouter({ prefix: '/file' })

// 路由映射
// 1. 用户注册接口
fileRouter.post('/avatar', verifyToken, handleAvatar, fileController.create)

module.exports = fileRouter
