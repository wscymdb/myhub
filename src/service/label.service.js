const connect = require('../app/database')
const { UNKNOW_ERROR } = require('../config/error.config')

class LabelService {
  async create(name, ctx) {
    try {
      const sql = `INSERT INTO label(name) VALUES(?)`
      const [value] = await connect.execute(sql, [name])
      if (value.affectedRows > 0) {
        return value
      } else {
        ctx.app.emit('error', UNKNOW_ERROR, ctx)
        return false
      }
    } catch (error) {
      console.log(error, 'label')
    }
  }
  async existsLabel(label, ctx) {
    const sql = `SELECT * FROM label WHERE name = ?`

    const [value] = await connect.execute(sql, [label])
    return value[0]
  }
}

module.exports = new LabelService()
