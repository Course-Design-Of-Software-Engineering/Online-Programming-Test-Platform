const mongoose = require('mongoose');

// 题目表结构
var problemSchema = mongoose.Schema({
	id: {
        type: String,
        require: true
    },
	title: { // 题目名称
		type: String,
		require: true
    },
    setter: { // 出题者
        type: String,
        require: true
    },
    type: { // 题目类型
        type: String,
        enum: ["算法","前端","SQL"]
    },
    link: { // 题目链接
        type: String,
        require: true
    },
    description: {  // 题目描述
        type: String
    },
    sample:[{
        in:String, //输入样例
        out:String //输出样例
    }]
});


// 导出模型构造函数
module.exports = mongoose.model('Problem', problemSchema)