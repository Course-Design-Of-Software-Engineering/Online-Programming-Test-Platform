// 引包
const express = require('express')
const mysql = require('mysql')
const models_db = require('../db/db');
const router = express.Router()

// 创建mysql连接
const db = mysql.createConnection(models_db.mysql);

// 连接数据库
db.connect((err) => {
  if(err) throw err;
  console.log('连接成功');
})

// 把路由都挂载到 router 路由容器中 注册接口
  
// 当服务器收到 get 请求 / 的时候，执行回调处理函数
router.get('/', (req, res) => {
    res.render('index.html',{

    });
})

router.get('/login', (req, res) => {
    res.render('login.html',{

    });
})
  
router.get('/register', (req, res) => {
    res.render('register.html',{

    });
})

router.post('/register', (req, res) => {
    const params = req.body;
    console.log(req)
    console.log(params)
    console.log(params.nowcoder1)
	const sel_sql = "insert into user (email, password) values (?,?,?) where email = '" + params.email + "'";
	const add_sql = "select * from user"
    // console.log(sel_sql);
    
    // db.query(sql, (err,result) => {
    //     if(err){
    //         console.log('[SELECT ERROR]:',err.message);
    //     }
    //     console.log(result);  //数据库查询结果返回到result中

	// 	if (results.length != 0 && params.username == results[0].username) {
	// 		res.send("-1");   // -1 表示用户名已经存在
	// 	} else {
	// 		db.query(add_sql, [params.username, params.email, params.password], (err, rst) => {
	// 			if (err) {
	// 				console.log(err);
	// 			} else{
	// 				console.log(rst);
	// 				res.send("0"); // 0 表示用户创建成功
	// 			}
	// 		});
	// 	}
	// });
});


  // 当服务器收到 get 请求 /test 的时候，执行回调处理函数
  router.get('/test', (req, res) => {
    // // req request url地址后的请求信息 请求http://localhost:3000/?id=123 返回{ id: '123' }
    // // 在 Express 中可以直接 req.query 来获取查询字符串参数
    // console.log(req.query)
  
    // // res.send和res.render 都会返回信息给客户端
    // // 而客户端发出一次请求，服务器只能给出一次响应
    // // 因此res.send和res.render不能同时使用 否则响应两次 报错
    // res.send('Hello!')
  
    // express默认会去views目录找index.html
    // 在 Express 中使用模板引擎：res.render('文件名， {模板对象})
    res.render('test.html',{
      comments:comments
    });
  })

  router.get('/forget_pwd', (req, res) => {
    res.render('forget_pwd.html',{

    });
})

// // 关闭数据库
// db.end((err) => {
//     if(err) throw err;
//     console.log('关闭数据库');
// })

// 导出 router
module.exports = router