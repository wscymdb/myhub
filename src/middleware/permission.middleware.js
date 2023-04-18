const { UNPERMISSION } = require('../config/error.config')
const momentService = require('../service/moment.service')
const permissionService = require('../service/permission.service')

async function verifMomentPermission(ctx, next) {
  try {
    // 获取userid、动态id
    // 根据要修改的动态的id，判断当前用户是否是创建该动态的用户
    // 如果不是则无权限操作
    const { id: userId } = ctx.tokenInfo

    if (userId === 1) {
      return await next()
    }

    // 判断是否有权限
    const isPermission = await permissionService.momentChecke(ctx)
    if (isPermission) {
    }
    return isPermission
      ? await next()
      : ctx.app.emit('error', UNPERMISSION, ctx)
  } catch (error) {
    console.log(error)
  }
}

module.exports = verifMomentPermission
