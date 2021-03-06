// 引包
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const userRouter = require('./router/user')
const historyRouter = require('./router/history')
const codingRouter = require('./router/coding')
const socket = require('./router/socket')
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false)


//mongoose.connect('mongodb://localhost/testdb'); // 设置了账号密码的数据库
mongoose.connect('mongodb://admin:admin@localhost/platform'); // 没有设置账号密码的数据库

var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', function() {
//  console.log('mogodb is connected!')
//});

//监听连接成功(回调)
db.on('connected',function () {
  console.log("MongoDB connected success.")
});
//连接异常
db.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});


// 创建服务器应用程序
const app = express()

// 允许跨域
app.use(cors())

// 配置body-parser
// 只要加入这个配置，则在req请求对象上会多出来一个属性：body
// 也就是说可以直接通过req.body来获取表单post请求数据
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 将public文件公开 使用/public/xxx访问public文件中的内容
app.use('/public/', express.static('./public'))
app.engine('html', require('express-art-template'))

// 把路由容器挂载到 app 服务中
app.use(userRouter)
app.use(historyRouter)
app.use(codingRouter)

//---------启动socket.io------------
// var server = require('http').Server(app);
// var io = require('./socketio');
// io.getSocketio(server);
//----------------------------------
// server.listen(3000, () => {
//   console.log('server running at 127.0.0.1:3000');
// });

// 相当于 server.listen
app.listen(3000, function () {
  console.log('app is running at port 3000.')
})



// date='2020-06-27T14:20:27.000000Z';
// console.log(date)
// var json_date = new Date(date).toJSON();
// console.log(json_date)
// new_data= new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, ''); 
// console.log(new_data) // 2020-06-27 14:20:27