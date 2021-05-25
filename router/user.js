// 引包
const { render } = require('art-template')
const { json } = require('body-parser')
const express = require('express')
const user = require('../model/user')
const bodyParser = require('body-parser');
const router = express.Router()


// 读取用户email，从数据库中查找，渲染用户个人信息
router.get('/user_center', (req, res) => {
  // userEmail=req.body.email
  userEmail = "goodmanfrye@velity.com"
  user.find({email:userEmail},function (err, data){
    if (err) {
      return res.status(500).send('Server error.')
    }
    else{
      if(data.length==0){
        res.send("找不到该用户 T T") //正常情况下应该不会有这种情况，传进来的email肯定在数据库存在的
      }
      else{
        res.render('user_center.html', { // 替换成实际的用户中心界面 data为传入的用户数据
          user:data
        })
      }
    }
  }).lean()
})

// 渲染编辑页面
router.get('/user_center/edit',(req,res) => {
  // userEmail=req.body.email
  // userEmail = "goodmanfrye@velity.com"
  // userID = "60aa1f0b478ec5306e3c4b5d"
  console.log("ppp---------",req.body)
  user.find({email:userEmail = "goodmanfrye@velity.com"},function (err, data){
    if (err) {
      return res.status(500).send('Server error.')
    }
    else{
      if(data.length==0){
        res.send("找不到该用户 T T") //正常情况下应该不会有这种情况，传进来的email肯定在数据库存在的
      }
      else{
        res.render('user_center_edit.html', { // 替换成实际的用户中心界面 data为传入的用户数据
          user:data
        })
      }
    }
  }).lean()
})

// 根据提交的表单修改用户信息并刷新
router.post('/user_center/edit',(req,res) => {
  // var editedUser = new user(req.body) // 创建编辑后的用户对象
  //"_id":"60aa1f0b478ec5306e3c4b5d" // 还是不能用id editedUser只包括更新了的信息
  var editedUser = {"identity":"面试官","password":"1958AUTOMONGluid","username":"Andrews","phone":"16761230431"}
  var userEmail="goodmanfrye@velity.com"
  user.findOneAndUpdate({email:userEmail}, editedUser,{new: true}, function (err, docs) { 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Updated User:", docs); 
        res.redirect('/user_center')
    } 
  })
})

router.post('/login', (req, res) => {
  var loginUser = {"email":"13530304036@163.com","password":"1958AUTOMONGluid"}
  user.find({email:loginUser.email,password:loginUser.password},function (err, data){
    if (err){ 
      return res.status(500).send('Server error.')
    } 
    else{ 
      if(data.length==0){
        console.log("用户不存在/密码错误")
      }
      else{
        // 登陆成功 跳转个人界面
        res.redirect('/user_center')
      }
    } 
  })
})

router.get('/register', (req, res) => {
  // res.render('user_center_edit.html', {})
  user.find({email:userEmail = "goodmanfrye@velity.com"},function (err, data){
    if (err) {
      return res.status(500).send('Server error.')
    }
    else{
      if(data.length==0){
        res.send("找不到该用户 T T") //正常情况下应该不会有这种情况，传进来的email肯定在数据库存在的
      }
      else{
        res.render('user_center_edit.html', { // 替换成实际的用户中心界面 data为传入的用户数据
          user:data
        })
      }
    }
  }).lean()
})

router.post('/register', (req, res) => {
  var registerUser = {"email":"13530304036@163.com","password":"1958AUTOMONGluid"}
  user.find({email:registerUser.email},function (err, data){
    if (err){ 
      return res.status(500).send('Server error.')
    } 
    else{ 
      if(data.length==0){
        // 创建新用户
        user.create(registerUser,function (err) {
          if (err) {
            console.log("创建用户失败")
            return console.error(err);
          }
          console.log("创建用户成功")
        });
        res.redirect('/login')
      }
      else{
        // 提示已存在该用户
        console.log("已存在该用户")
      }
    } 
  })
})


  // // 当服务器收到 get 请求 /test 的时候，执行回调处理函数
  // router.get('/test', (req, res) => {
  //   // req request url地址后的请求信息 请求http://localhost:3000/?id=123 返回{ id: '123' }
  //   // 在 Express 中可以直接 req.query 来获取查询字符串参数
  //   console.log(req.query)
  
  //   // res.send和res.render 都会返回信息给客户端
  //   // 而客户端发出一次请求，服务器只能给出一次响应
  //   // 因此res.send和res.render不能同时使用 否则响应两次 报错
  //   res.send('Hello!')
  
  //   // express默认会去views目录找index.html
  //   // 在 Express 中使用模板引擎：res.render('文件名， {模板对象})
  //   res.render('test.html',{
  //     comments:comments
  //   });
  // })



// 导出 router
module.exports = router