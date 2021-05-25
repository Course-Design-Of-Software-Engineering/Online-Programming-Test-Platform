const mongoose = require('mongoose');

// 用户表结构
var userSchema = mongoose.Schema({
	email: { //邮箱
        type: String,
        require: true
    },
	password: { //密码
		type: String,
		require: true
    },
    identity: { //身份
        type: String,
        enum: ["面试官", "候选人"], 
        default: "候选人"
    },
    username: { //用户名
        type: String,
        require:true
    },
    // avatar: { //头像
    // },
    phone: { // 联系方式
        type: String,
    },
    gender: {
        type: Number,
        enum: [0, 1],
    },
    birthday: {
        type: Date
    },
    intenden_position: { //职位
        type:String //面试者填意向岗位；面试官填需要面试的岗位
    },
    cur_info:[{
        company:String, // 公司
        position:String, // 职位
        title:String // 职级
    }],
    edu_info:[{
        school:String, //学校
        major:String, //专业
        education:String, //学历
        start:Date //入学时间
    }]
});



// 导出模型构造函数
module.exports = mongoose.model('User', userSchema)