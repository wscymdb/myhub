const KoaRouter = require('@koa/router')

// 路由对象
const userRouter = new KoaRouter({ prefix: '/users' })

// 路由映射
userRouter.get('/', (ctx, next) => {
  ctx.body = 123
})

module.exports = userRouter
