const pool = require('../app/database')

class UserService {
  create(user) {
    console.log('数据库操作')
    console.log(user)
  }
}

module.exports = new UserService()
