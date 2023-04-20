// dotenv会读取.env文件
const dotenv = require('dotenv')

// 会读取.env文件并将里面的内容加入到process.env中
dotenv.config()

module.exports = { SERVER_PORT, SERVER_HOST } = process.env
