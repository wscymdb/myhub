const pool = require('../app/database')
const { UNKNOW_ERROR } = require('../config/error.config')

class UserService {
  async create(user, ctx) {
    const { name, password } = user
    // sql语句
    const addSql = `INSERT INTO users(name,password) VALUES(?,?)`
    try {
      //添加用户
      const [val] = await pool.execute(addSql, [name, password])
      if (val.affectedRows === 1) {
        return {
          code: 0,
          data: null,
          msg: '注册用户成功～',
        }
      }
    } catch (error) {
      console.log(error, '🙁')
      ctx.app.emit('error', UNKNOW_ERROR, ctx)
      return false
    }
  }

  async findUserByName(name) {
    const searchSql = `SELECT name FROM users WHERE name = ?`
    // 查看数据库中是否有该用户
    const [value] = await pool.execute(searchSql, [name])
    return value
  }
}

module.exports = new UserService()
