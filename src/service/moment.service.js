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
    ) commentCount, (
        SELECT COUNT(*)
        FROM moment_label ml
        WHERE
            mt.id = ml.moment_id
    ) labelCount
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
    mt.updateAt updateTime, (
        SELECT
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
        FROM comment ct
            LEFT JOIN users cus ON ct.user_id = cus.id
        WHERE
            ct.moment_id = mt.id
    ) comments,
    JSON_ARRAYAGG(
        JSON_OBJECT('id',lb.id,'name',lb.name)
    ) labels
FROM moment mt
    LEFT JOIN users us ON mt.user_id = us.id
    LEFT JOIN moment_label ml ON mt.id = ml.moment_id
    LEFT JOIN label lb ON ml.label_id = lb.id
WHERE mt.id = ?
GROUP BY mt.id;`

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
  async hasLabel(momentId, labelId) {
    const sql = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?`

    const [value] = await connection.execute(sql, [momentId, labelId])
    return !!value.length
  }
  async addLabels(momentId, labelId) {
    const sql = `INSERT INTO moment_label(moment_id,label_id) VALUES (?,?)`
    const [value] = await connection.execute(sql, [momentId, labelId])
    return value
  }
}

module.exports = new MomentService()
