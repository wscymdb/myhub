const { SERVER_PORT } = require('./config/server.config')
const app = require('./app')

app.listen(SERVER_PORT, () => {
  console.log(`${SERVER_PORT}端口监听成功😁`)
})
