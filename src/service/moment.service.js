const connection = require('../app/database')
const { UNKNOW_ERROR } = require('../config/error.config')

class MomentService {
  async create(moment, ctx) {
    const { content, id } = moment
    try {
      const sql = `INSERT INTO  moment(content,user_id) VALUES(?,?)`
      const [value] = await connection.execute(sql, [content, id])
      if (value.affectedRows > 0) {
        return true
      } else {
        ctx.app.emit('error', UNKNOW_ERROR, ctx)
        return false
      }
    } catch (error) {
      console.log(error, 'momentController')
      ctx.app.emit('error', UNKNOW_ERROR, ctx)
    }
  }
}

module.exports = new MomentService()
