const connection = require('../app/database')

class PermissionService {
  async momentChecke(ctx) {
    const { id: userId } = ctx.tokenInfo
    const { id: momentId } = ctx.request.body

    const sql = `SELECT * FROM moment WHERE user_id = ? AND id = ?`

    const [value] = await connection.execute(sql, [userId, momentId])
    return !!value.length
  }
}

module.exports = new PermissionService()
