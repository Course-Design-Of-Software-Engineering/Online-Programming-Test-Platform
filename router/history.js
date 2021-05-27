const express = require('express')
const router = require('router')
const interview = require('../model/interview')
const problem = require('../model/problem')
const mongoose = require('mongoose')
const session = require('express-session')

//连接数据库
mongoose.connect('mongodb://localhost:27017/platform')
mongoose.connection.on('connected',()=>{
    console.log("mongodb连接成功")
})
mongoose.connection.on('error',()=>{
    console.log("mongodb连接出错")
})


//历史面试页面
router.get('/historyInterview',(req,res)=>{
    
    //通过保存的登录信息：邮箱，去数据库去查找
    interview.find({$or:[{interviewee: req.session.email},{interviewer: req.session.email}]},(err,data)=>{
        "use strict";
        if(err){
            res.json({
                status:1,
                msg:err.message
            })
        }
        else{
            res.json({
                status:0,
                mas:'',
                result:{
                    count:data.length,
                    list:data
                }
            })
        }
    })
});


//历史题目页面
//去面试记录去拿题目id，再用题目id去题目表里读取数据(还没写)
router.get('/historyQuestion',(req,res)=>{
    problem.find({},(err,data)=>{
        "use strict";
        if(err){
            res.json({
                status:1,
                msg:err.message
            })
        }
        else{
            res.json({
                status:0,
                mas:'',
                result:{
                    count:data.length,
                    list:data
                }
            })
        }
    })
});


module.exports = router;