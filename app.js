// 引包
const express = require('express')
const bodyParser = require('body-parser');
const router = require('./server/api/router')

// 创建你服务器应用程序
const app = express()

// 将public文件公开 使用/public/xxx访问public文件中的内容
app.use('/public/', express.static('./public'))

app.engine('html', require('express-art-template'))

// 把路由容器挂载到 app 服务中
app.use(router)

// 相当于 server.listen
app.listen(3000, function () {
  console.log('app is running at port 3000.')
})