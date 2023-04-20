const { UPLOAD_PATH } = require('../config/path')
const userService = require('../service/user.service')

const fs = require('fs')
class UserController {
  async create(ctx, next) {
    // 获取客户端数据
    const info = ctx.request.body
    // 数据库操作 添加用户
    const result = await userService.create(info, ctx)
    if (result) {
      ctx.body = result
    }
  }

  async showAvatarImage(ctx, next) {
    console.log(ctx.request.ip)
    try {
      const { id } = ctx.params

      const result = await userService.showAvatarById(id)
      if (result) {
        const { mimeType, filename } = result
        const readFile = fs.createReadStream(`./${UPLOAD_PATH}/${filename}`)
        // 如果是文件流的话,浏览器会当成文件下载下来，告诉type是啥 浏览器就能解析
        // 本质就是设置response.content-type
        ctx.type = mimeType
        ctx.body = readFile
      } else {
        ctx.body = {
          code: -1,
          msg: '该用户暂未上传头像～',
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new UserController()
