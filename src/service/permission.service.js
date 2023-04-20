const connection = require('../app/database')

class PermissionService {
  async check(ctx, resourceName) {
    const { id: userId } = ctx.tokenInfo
    let momentId
    const method = ctx.method

    if (method === 'PATCH') {
      momentId = ctx.request.body.id
    } else {
      momentId = ctx.params.id
    }

    const sql = `SELECT * FROM ${resourceName} WHERE user_id = ? AND id = ?`

    const [value] = await connection.execute(sql, [userId, momentId])
    return !!value.length
  }
}

module.exports = new PermissionService()
