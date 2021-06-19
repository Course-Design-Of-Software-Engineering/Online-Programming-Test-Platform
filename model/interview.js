const mongoose = require('mongoose');

// 面试表结构
var interSchema = mongoose.Schema({
	interviewer: { // 面试官id
        type: String,
        require: true
    },
	interviewee: { // 面试者id
		type: String,
		require: true
    },
    title: { // 面试名称
        type: String
    },
    link: { // 链接
        type: String,
        require:true
    },
    time: { // 面试时间
        type: String,
    },
    problem:[{  // 题目id
        type: String
    }],
    result:[{
        code:String, // 代码
        judge:String, // 评判
        score:String // 得分
    }],
    chat:[{
        email:String, // 发言人email
        message:String, // 消息
        moment:String // 发送时间
    }],
    participants:[{   //聊天参与者
        email:String
    }],
    company:{
        type:String
    },
    finalResult:{
        type:String
    }
});



// 导出模型构造函数
module.exports = mongoose.model('Interview', interSchema)