const { render } = require('art-template')
var express = require('express')
var interview = require('../model/interview')
var problem = require('../model/problem')
var router = express.Router()

// -----------------------socket test 报错就注释掉 但是不要删掉！！！！ dmj----------------------
/* var http = require("http");
var express = require("express"); //引入express
var socketIo = require("socket.io"); //引入socket.io

var app = new express();
var server = http.createServer(app);
var io = socketIo(server); //将socket.io注入express模块

app.use(express.static(__dirname));
//客户端 1 的访问地址
app.get("/client1", function (req, res, next) {
    res.sendFile(__dirname + "/html/client1.html");
});
//客户端 2 的访问地址
app.get("/client2", function (req, res, next) {
    res.sendFile(__dirname + "/html/client2.html");
});


server.listen(9000); //express 监听 9000 端口，因为本机80端口已被暂用
//每个客户端socket连接时都会触发 connection 事件
io.on("connection", function (clientSocket) {
    // socket.io 使用 emit(eventname,data) 发送消息，使用on(eventname,callback)监听消息
    //监听客户端发送的 sendMsg 事件
    clientSocket.on("sendMsg", function (data) {
        // data 为客户端发送的消息，可以是 字符串，json对象或buffer
        // 使用 emit 发送消息，broadcast 表示 除自己以外的所有已连接的socket客户端。
        clientSocket.broadcast.emit("receiveMsg", data);
    })
}); */
// -----------------------socket test 报错就注释掉 但是不要删掉！！！！ dmj----------------------



//面试官点击创建面试按钮创建一场面试
router.post('/codingPage',(req, res)=>{
	//保存面试官id和面试者id
	var interviewer = req.body.interviewer
	var interviewee = req.body.interviewee


	interview.create({interviewer:interviewer,interviewee:interviewee},(err) => {
		if(err){
			res.json({
				status:"1"
			})
		}else{
			res.json({
				status:"0"
			})
		}
	})

})

//面试官新创建一个题目 
router.post('/codingPage/createP',(req, res)=>{
	//获取提交的题目信息
	//var newProblem = new problem(req.body.formContent)
	//console.log("接收到的新建题目",newProblem)
	//console.log("接收到的新建题目：",req.body.formContent)
	//var existedProblem = 10
	//existedProblem = existedProblem + 1 
	//var newId = "00" + existedProblem
	//console.log("newid:",newId)

	problem.find((err,data)=>{
		if(!err)
		//创建新的题目id:已有题目数+1
		//console.log("existed problemd data:",data)
		var existedProblem = data.length
		//console.log("existed problem count:",existedProblem)
		existedProblem = existedProblem + 1 
		var newId = "00" + existedProblem

		//console.log("existed problem count:",existedProblem)
		//保存接收到的题目输入输出示例
		var newSamplel = []
		var temp = {
			in:req.body.formContent.sample_in,
			out:req.body.formContent.sample_out
		}
		newSamplel.push(temp)

		//将新建题目存入数据库中并渲染编程界面展示题目内容
		problem.create({
			id:newId,
			description:req.body.formContent.questionDescription,
			title:req.body.formContent.questionTitle,
			type:req.body.formContent.questionType,
			sample:newSamplel
		},function(err, data){
			//console.log("create data:",data)
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
	
})

//面试官修改一个题目
router.post('/codingPage/EditP',(req, res)=>{

	//获取提交的题目信息
	var pid = req.body.id
	var newDescription = req.body.formContent.questionDescription
	var newTitle = req.body.formContent.questionTitle
	var newType = req.body.formContent.questionType
	var newSamplel = []
		var temp = {
			in:req.body.formContent.sample_in,
			out:req.body.formContent.sample_out
		}
	newSamplel.push(temp)
	
	//在数据库中修改
	problem.findOneAndUpdate({id:pid},{
		description:newDescription,
		title:newTitle,
		type:newType,
		sample:newSamplel
	},function(err,data){
		console.log("updata data:",data)
		if (err){ 
			res.json({
			  status:1, // 状态码应该为500 服务端出错
			  msg:err.message
			})
		} 
		else{ 
		  res.json({
			status:0, //修改成功
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

//选择题目类别
router.get('/questionBank',(req,res)=>{
	//获取选择的题目类别
	var pType = req.query.type
	
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
	var pid = req.query.id
	console.log("pid:",pid)

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

//------------聊天（未完成）-----------
//显示聊天记录
router.get('/codingPage/chatLog',(req,res)=>{
	//获取该次面试id
	var interviewId = req.query._id

	//查找该次面试的聊天记录
	interview.find({title:interviewId}, function(err, data){
		if(err){
			res.json({
				status:'1',
				msg:err.message
			})
		}
		else if(data.length == 0){
			res.json({
				status:'0',
				msg:'获取聊天记录失败！'
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
