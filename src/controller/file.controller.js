const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { SERVER_PORT, SERVER_HOST } = require('../config/server.config')
class FileController {
  async create(ctx, next) {
    const { mimetype, size, filename } = ctx.request.file
    const { id } = ctx.tokenInfo
    const result = await fileService.createAvatar(
      { mimetype, size, filename, id },
      ctx
    )
    // 头像上传成功 就头像地址更新到users表中

    const avatarUrl = `http://${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`
    const result2 = await userService.updateUserAvatar(avatarUrl, id)
    if (result && result2) {
      ctx.body = {
        code: 0,
        msg: '头像上传成功～',
        avatarUrl,
      }
    }
  }
}

module.exports = new FileController()
