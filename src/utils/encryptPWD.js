// node 内置的加密模块
const crypto = require('crypto')

// 使用md5进行加密
function md5EncryptPWD(pwd) {
  const md5 = crypto.createHash('md5')

  // 返回的结果是二进制的，将其转换成16进制的进行存储
  const md5Pwd = md5.update(pwd).digest('hex')

  return md5Pwd
}

module.exports = md5EncryptPWD
