const { render } = require('art-template')
var express = require('express')
var interview = require('../model/interview')
var problem = require('../model/problem')
var router = express.Router()

//从题库页面或题目详情页面点击添加按钮添加题目到编程页面
router.get('/codingPage',(req, res)=>{
	//获取选择的题目id
	var pid = req.query

	//查找该题目获取详细信息并渲染编程界面
	problem.find({id:pid}, function(err, data){
		if(err){
			res.json({
				status:'1',
				msg:err.message
			})
		}
		else if(data.length == 0){
			res.json({
				status:'0',
				msg:'获取题目信息失败！！'
			})
		}
		else{
			res.json({
				status:'0',
				msg:'',
				result:{
					count:data.length,
					List:data
				}
			})
		}
	})
})

//面试官新创建一个题目 
router.post('/codingPage/createP',(req, res)=>{
	//获取提交的题目信息
	var newProblem = new problem(req.body)

	//将新建题目存入数据库中并渲染编程界面展示题目内容
	newProblem.save(function(err, data){
		if(err){
			res.json({
				status:'1',
				msg:err.message
			})
		}else{
			res.json({
				status:'0',
				msg:'题目创建成功！',
				result:{
					count:data.length,
					List:data
				}
			})
		}
	})
})

//面试者提交代码
router.post('/codingPage/code',(req,res)=>{
	//获取提交的代码信息
	var newCode = req.body.result.code
	//获取该次面试id
	var interviewId = req.body._id

	//查找对应面试并添加结果中的代码
	interview.findOneAndUpdate({title:interviewId},
		{$addToSet:{result:{code:newCode}}},
		function(err, data){
			if(err){
				res.json({
					status:'1',
					msg:err.message
				})
			}else{
				res.json({
					status:'0',
					msg:'代码提交成功！',
					result:{
						count:data.length,
						List:data
					}
				})
		}
	})
})

//发送聊天信息（未完成）
router.post('/codingPage/chat',(req,res)=>{
	
})

//选择题目类别
router.get('/questionBank',(req,res)=>{
	//获取选择的题目类别
	var pType = req.query

	//查找该类别题目获取信息并渲染题库页面
	problem.find({type:pType}, function(err, data){
		if(err){
			res.json({
				status:'1',
				msg:err.message
			})
		}
		else if(data.length == 0){
			res.json({
				status:'0',
				msg:'获取题目信息失败！'
			})
		}
		else{
			res.json({
				status:'0',
				msg:'',
				result:{
					count:data.length,
					List:data
				}
			})
		}
	})
})

//显示所选的详细题目信息
router.get('/questionDetail',(req,res)=>{
	//获取选择的题目id
	var pid = req.query

	//查找该题目获取详细信息并渲染题目详情页面
	problem.find({id:pid}, function(err, data){
		if(err){
			res.json({
				status:'1',
				msg:err.message
			})
		}
		else if(data.length == 0){
			res.json({
				status:'0',
				msg:'获取题目信息失败！'
			})
		}
		else{
			res.json({
				status:'0',
				msg:'',
				result:{
					count:data.length,
					List:data
				}
			})
		}
	}) 
})

module.exports = router
