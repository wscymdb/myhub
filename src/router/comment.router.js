const KoaRouter = require('@koa/router')
const commentController = require('../controller/comment.controller')
const verifyToken = require('../middleware/token.middleware')

const commentRouter = new KoaRouter({ prefix: '/comment' })

// 增 新增评论
commentRouter.post('/', verifyToken, commentController.create)

// 增 回复评论
commentRouter.post('/reply', verifyToken, commentController.reply)
module.exports = commentRouter
