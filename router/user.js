// 引包
const { render } = require('art-template')
const { json } = require('body-parser')
const express = require('express')
const user = require('../model/user')
const bodyParser = require('body-parser');
const { countDocuments } = require('../model/user');
const router = express.Router()


// ok 读取用户email，从数据库中查找，渲染用户个人信息
router.get('/user_center', (req, res) => {
  // console.log("in /personalInfo-------req.query.email:")
  // console.log(req.query.email)
  userEmail=req.query.email  // userEmail = "goodmanfrye@velity.com"
  user.find({email:userEmail},function (err, data){
    if (err) {
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

// no use 渲染编辑页面
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
    }
  }).lean()
})

// 根据提交的表单修改用户信息并刷新
router.post('/user_center/edit',(req,res) => {
  var userEmail=req.body.email
  var editedUser=req.body.formContent //【！！不确定能不能这样写！！】
  var json_birthday = new Date(editedUser.birthday).toJSON()
  var edited_json={
    username:editedUser.user,
    phone:editedUser.phone,
    // gender:editedUser.gender
    // birthday:json_birthday, //'1989-06-24T00:00:00.000Z'

    cur_info:{
      intenden_position:editedUser.currPosition,
      title:editedUser.currTitle
    },
    edu_info:{
      school:editedUser.school,
      major:editedUser.major,
      education:editedUser.eduDegree,
    //   start:new Date(editedUser.entranceYear).toJSON() //'1970-01-01T00:00:02.020Z'
    },
  }

  user.findOneAndUpdate({email:userEmail}, edited_json, {new: true}, function (err, docs) { 
    console.log("---------------------------------------\nuserEmail:",userEmail)
    console.log("editedUser:",editedUser)
    console.log("edited_json:",edited_json)
    console.log("json_birthday:",json_birthday)
    console.log("docs:",docs)
    if (err){ 
        res.json({
          status:1, // 状态码应该为500 服务端出错
          msg:err.message
        })
    } 
    else{ 
      res.json({
        status:0,
      })
    } 
  })
})

// ok 用户登录查询账号密码是否匹配
router.post('/login', (req, res) => {
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

// ok 注册
router.post('/register', (req, res) => {
  // req.body.xxx：用户注册信息 一定包含用户名、邮箱、密码；可选意向岗位、手机号码、目前岗位
  // var registerUser = {"email":"13530304036@163.com","password":"1958AUTOMONGluid"}
  console.log("req.body.email:",req.body.email)
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

// 导出 router
module.exports = router