const connect = require('../app/database')
const { UNKNOW_ERROR } = require('../config/error.config')

class FileService {
  async createAvatar(info, ctx) {
    try {
      const { mimetype, size, filename, id } = info
      const sql = `INSERT INTO avatar(filename,size,mimeType,user_id) VALUES(?,?,?,?)`
      const [value] = await connect.execute(sql, [filename, size, mimetype, id])
      if (value.affectedRows > 0) {
        return value
      } else {
        ctx.app.emit('error', UNKNOW_ERROR, ctx)
        return false
      }
    } catch (error) {
      console.log(error, 'avatar')
    }
  }
}

module.exports = new FileService()
