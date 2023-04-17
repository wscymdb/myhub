const { UNPERMISSION } = require('../config/error.config')
const momentService = require('../service/moment.service')

async function verifMomentPermission(ctx, next) {
  try {
    // 获取userid、动态id
    // 根据要修改的动态的id，判断当前用户是否是创建该动态的用户
    // 如果不是则无权限操作
    const { id: userId } = ctx.tokenInfo
    const { id: momentId } = ctx.request.body
    const [moment] = await momentService.queryListById(momentId)

    if (userId === moment.userInfo.id) {
      await next()
    } else {
      ctx.app.emit('error', UNPERMISSION, ctx)
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = verifMomentPermission
