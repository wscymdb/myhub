const { SERVER_PORT } = require('./config/server.config')
const app = require('./app')
require('./utils/handle-error')

app.listen(SERVER_PORT, () => {
  console.log(`${SERVER_PORT}端口监听成功😁`)
})
