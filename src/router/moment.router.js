const KoaRouter = require('@koa/router')
const verifyToken = require('../middleware/token.middleware')
const momentController = require('../controller/moment.controller')
const verifPermission = require('../middleware/permission.middleware')

const momentRouter = new KoaRouter({ prefix: '/moment' })

//创建动态
momentRouter.post('/', verifyToken, momentController.create)

// 获取动态列表
momentRouter.get('/', momentController.list)

// 获取动态详情
momentRouter.post('/:id', momentController.detail)

// 修改动态 只有登陆的用户才能修改动态
momentRouter.patch(
  '/',
  verifyToken,
  verifPermission('moment'),
  momentController.update
)

// 删除动态  只有登陆的用户才能修改动态
momentRouter.delete(
  '/:id',
  verifyToken,
  verifPermission('moment'),
  momentController.delete
)
module.exports = momentRouter
