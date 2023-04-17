const fs = require('fs')

/**
 * 自动注册路由函数
 * @param {app对象} app
 */
function registerRouters(app) {
  // 1. 读取当前文件夹下的所有文件
  const files = fs.readdirSync(__dirname)

  // console.log(files)

  // 遍历所有文件 只有是.router.js结尾的才注册
  for (const file of files) {
    if (file.endsWith('.router.js')) {
      const router = require(`./${file}`)
      app.use(router.routes())
      app.use(router.allowedMethods())
    }
  }
}

module.exports = registerRouters
