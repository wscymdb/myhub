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

    const sql = `SELECT
    mt.id id,
    mt.content content,
    mt.createAt createTime,
    mt.updateAt updateTime,
    JSON_OBJECT('id', us.id, 'name', us.name) userInfo, (
        SELECT COUNT(*)
        FROM comment ct
        WHERE
            mt.id = ct.moment_id
    ) commentCount
FROM moment mt
    LEFT JOIN users us ON mt.user_id = us.id
    LIMIT ? OFFSET ? `

    const [value] = await connection.execute(sql, [
      String(pageSize),
      String(current),
    ])
    return value
  }

  async queryListById(id, ctx) {
    const sql = `SELECT
    mt.id id,
    mt.content content,
    mt.createAt createTime,
    mt.updateAt updateTime,
    JSON_OBJECT('id', us.id, 'name', us.name) userInfo, (
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id',
                ct.id,
                'content',
                ct.content,
                'commentId',
                ct.comment_id,
                'userInfo',
                JSON_OBJECT('id', cus.id, 'name', cus.name)
            )
        )
    ) comments
FROM moment mt
    LEFT JOIN users us ON mt.user_id = us.id
    LEFT JOIN comment ct ON mt.id = ct.moment_id
    LEFT JOIN users cus ON ct.user_id = cus.id
WHERE mt.id = ?
GROUP BY id`

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
      console.log(error, 'updateMoment')
      ctx.app.emit('error', UNKNOW_ERROR, ctx)
    }
  }

  async deleteById(id, ctx) {
    const sql = `DELETE FROM moment WHERE id = ?`
    const [value] = await connection.execute(sql, [id])

    try {
      if (value.affectedRows > 0) {
        return true
      } else {
        ctx.app.emit('error', UNKNOW_ERROR, ctx)
        return false
      }
    } catch (error) {
      console.log(error, 'updateMoment')
      ctx.app.emit('error', UNKNOW_ERROR, ctx)
    }
  }
}

module.exports = new MomentService()
