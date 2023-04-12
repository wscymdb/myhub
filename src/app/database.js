const mysql = require('mysql2')

// 创建连接池
const connectionPool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'myhub',
  user: 'root',
  password: 'qwerty123',
  connectionLimit: 8,
})

// 获取连接是否成功
connectionPool.getConnection((err, connection) => {
  if (err) return console.log('获取连接失败')

  // 获取connection ，尝试和数据库建立一些连接
  connection.connect((err) => {
    if (err) {
      console.log('与数据库交互失败')
    } else {
      console.log('连接数据库成功～')
    }
  })
})

// 将连接池的连接变成promise方式
const connection = connectionPool.promise()

module.exports = connection
