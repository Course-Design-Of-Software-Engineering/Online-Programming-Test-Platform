// 引包
const { render } = require('art-template')
const { json } = require('body-parser')
const express = require('express')
const user = require('../model/user')
const bodyParser = require('body-parser');
const { countDocuments } = require('../model/user');
const router = express.Router()


// 读取用户email，从数据库中查找，渲染用户个人信息
router.get('/user_center', (req, res) => {
  userEmail=req.query.email  // userEmail = "goodmanfrye@velity.com"
  user.find({email:userEmail},function (err, data){
    if (err) {
      res.json({
        status:1, // 状态码应该为500 服务端出错
        msg:err.message
      })
    }
    else{
      res.json({
        status:0,
        result:{
          count:data.length,
          list:data
        }
      })
      // if(data.length==0){res.send("找不到该用户 T T")}
      // else{
      //   res.render('user_center.html', { // 替换成实际的用户中心界面 data为传入的用户数据
      //     user:data})
      // }
    }
  }).lean()
})

// 渲染编辑页面
router.get('/user_center/edit',(req,res) => {
  userEmail=req.query.email
  // userEmail = "goodmanfrye@velity.com"
  user.find({email:userEmail},function (err, data){
    if (err) {
      res.json({
        status:1, // 状态码应该为500 服务端出错
        msg:err.message
      })
    }
    else{
      res.json({
        status:0,
        result:{
          count:data.length,
          list:data
        }
      })
      // if(data.length==0){res.send("找不到该用户 T T")}
      // else{
      //   res.render('user_center_edit.html', { // 替换成实际的用户中心界面 data为传入的用户数据
      //     user:data})
      // }
    }
  }).lean()
})

// 根据提交的表单修改用户信息并刷新
router.post('/user_center/edit',(req,res) => {
  // var editedUser = new user(req.body) // 创建编辑后的用户对象
  //"_id":"60aa1f0b478ec5306e3c4b5d" // [还是不能用id editedUser只包括更新了的信息]
  
  // var editedUser = {"identity":"面试官","password":"1958AUTOMONGluid","username":"Andrews","phone":"16761230431"}
  // var userEmail="goodmanfrye@velity.com"
  var userEmail=req.body.email
  var editedUser=req.body //【！！不确定能不能这样写！！】
  user.findOneAndUpdate({email:userEmail}, editedUser,{new: true}, function (err, docs) { 
    if (err){ 
        res.json({
          status:1, // 状态码应该为500 服务端出错
          msg:err.message
        })
    } 
    else{ 
      res.json({
        status:0, //修改用户信息成功 重定向至user_center
        // ????????????????????????????????????????????????????????
      })
      // console.log("Updated User:", docs);  //【干啥用的 忘记了】
      // res.redirect('/user_center')
    } 
  })
})

router.post('/login', (req, res) => {
  console.log("req.body:",req.body)
  // eg：req.body = { email: 'goodmanfrye@velity.com', password: '1958AUTOMONGluid' } 
  // 返回json格式邮箱和密码用于查询
  user.find({email:req.body.email,password:req.body.password},function (err, data){
    console.log("提交表单信息：",req.body)
    console.log("查询返回结果：",data)
    if (err){ 
      console.log("error")
      res.json({
        status:1, // 状态码应该为500 服务端出错
        msg:err.message
      })
    } 
    else{ 
      console.log("data:",data)
      res.json({
        status:0,
        result:{
          count:data.length,
          list:data
        }
      })
      
    }
  }).lean()
})

// 为什么我会写这个 register需要get啥数据
// router.get('/register', (req, res) => {
//   // res.render('user_center_edit.html', {})
//   user.find({email:userEmail = "goodmanfrye@velity.com"},function (err, data){
//     if (err) {
//       return res.status(500).send('Server error.')
//     }
//     else{
//       if(data.length==0){
//         res.send("找不到该用户 T T") //正常情况下应该不会有这种情况，传进来的email肯定在数据库存在的
//       }
//       else{
//         res.render('user_center_edit.html', { // 替换成实际的用户中心界面 data为传入的用户数据
//           user:data
//         })
//       }
//     }
//   }).lean()
// })

router.post('/register', (req, res) => {
  // req.body.xxx：用户注册信息 一定包含用户名、邮箱、密码；可选意向岗位、手机号码、目前岗位
  // var registerUser = {"email":"13530304036@163.com","password":"1958AUTOMONGluid"}
  user.find({email:req.body.email},function (err, data){
    if (err){ 
      res.json({
        status:1, // 状态码应该为500 服务端出错
        msg:err.message,
        flag:-1 // -1:error
      })
    } 
    else{ 
      if(data.length==0){
        // 创建新用户
        user.create(req.body,function (err) {
          if (err) {
            res.json({
              status:1, //状态码应该为500 服务端出错 //console.log("创建用户失败")
              msg:err.message,
              flag:-1 // -1:error
            })
          }
          else{
            res.json({
              status:0, // console.log("创建用户成功") [可以跳转到login 但是不跳转好像也没无所谓]
              msg:"创建用户成功",
              flag:1 // 1:创建用户成功
            })
          }
        });
      }
      else{
        res.json({
          status:0, // console.log("已存在该用户")
          msg:"该用户已存在",
          flag:0 // 0:已存在该用户
        })
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