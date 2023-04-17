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

  async queryList(payload, ctx) {
    const { current, pageSize } = payload

    const sql = `SELECT mt.id id, mt.content content, mt.createAt createTime, mt.updateAt updateTime, JSON_OBJECT('id', us.id, 'name', us.name) userInfo FROM moment mt LEFT JOIN users us ON mt.user_id = us.id LIMIT ? OFFSET ? `

    const [value] = await connection.execute(sql, [
      String(pageSize),
      String(current),
    ])
    return value
  }

  async queryListById(id, ctx) {
    const sql = `SELECT mt.id id, mt.content content, mt.createAt createTime, mt.updateAt updateTime, JSON_OBJECT('id', us.id, 'name', us.name) userInfo FROM moment mt LEFT JOIN users us ON mt.user_id = us.id WHERE mt.id = ?`

    const [value] = await connection.execute(sql, [id])
    return value
  }

  async updateById({ id, content }, ctx) {
    const sql = `UPDATE moment SET content = ? WHERE id = ?`
    const [value] = await connection.execute(sql, [content, id])

    try {
      if (value.affectedRows > 0) {
        return true
      } else {
        ctx.app.emit('error', UNKNOW_ERROR, ctx)
        return false
      }
    } catch (error) {
      console.log(error)
      ctx.app.emit('error', UNKNOW_ERROR, ctx)
    }
  }
}

module.exports = new MomentService()
