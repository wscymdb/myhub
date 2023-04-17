const fs = require('fs')
const path = require('path')

// fs读取文件会有一个坑
//"dev": "node ./src/main.js",
// 如果用脚本启动项目，那么fs的相对路径是以启动脚本的文件为相对路径的
// 也就是以src为相对路径
// 所以这里使用绝对路径（官方也推荐使用绝对路径）

const PRIVATEKEY = fs.readFileSync(path.join(__dirname, 'keys/private.key'))
const PUBLICKEY = fs.readFileSync(path.join(__dirname, 'keys/public.key'))

module.exports = {
  PRIVATEKEY,
  PUBLICKEY,
}
