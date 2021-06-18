const express = require('express')
const router = require('router')
const interview = require('../model/interview')
const problem = require('../model/problem')
const mongoose = require('mongoose')
const session = require('express-session')


//历史面试页面
router.get('/historyInterview',(req,res)=>{
    
    //通过保存的登录信息：邮箱，去数据库去查找
    interview.find({$or:[{interviewee: req.session.email},{interviewer: req.session.email}]},(err,data)=>{   
        "use strict";
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
//去面试记录去拿题目id，再用题目id去题目表里读取数据
router.get('/historyQuestion',(req,res)=>{
    let problemid = []
    interview.find({$or:[{interviewee: req.session.email},{interviewer: req.session.email}]},(err,data)=>{   
        "use strict";
        if(err){
            console.log("查找面试信息失败")
        }
        else{
            problemid = data.result.problem
        }
    })


    problem.find({id:{$in:problemid}},(err,data)=>{
        "use strict";
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


module.exports = router;