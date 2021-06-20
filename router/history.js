const express = require('express')
const router = express.Router()
const interview = require('../model/interview')
const problem = require('../model/problem')
const mongoose = require('mongoose')
//const session = require('express-session')


//历史面试页面
router.get('/historyInterview', (req, res) => {

  //通过保存的登录信息：邮箱，去数据库去查找
  interview.find({ interviewee: req.query.email }, (err, data) => {
    "use strict";
    if (err) {
      res.json({
        status: 1,
        msg: err.message
      })
    }
    else {
      console.log('历史面试', data);
      res.json({
        status: 0,
        mas: '',
        result: {
          count: data.length,
          list: data
        }
      })
    }

  })
});


//历史题目页面
//去面试记录去拿题目id，再用题目id去题目表里读取数据
router.get('/historyQuestion', (req, res) => {  
  //problemid.push("1")
  //console.log("problemid:",problemid)
  //let list2 = {}
  interview.find({ interviewee: req.query.email }, (err, interview) => {
    "use strict";
    if (err) {
      console.log("查找面试信息失败")
    }
    else {
      data = interview
      //console.log("data:",data)
      //console.log("result length:",data[0].result.length)
      
      //保存面试信息中的：题目评判，题目得分，面试场次，面试时间
      var list1 = []
      var problemid = []
      for(i=0;i<data.length;i++){
        for(j=0;j<data[i].result.length;j++){
          var temp = {
            "judgement":data[i].result[j].judge,
            "score":data[i].result[j].score,
            "interview":data[i].title,
            "date":data[i].time
          }
          list1.push(temp)
          problemid.push(data[i].problem[j])
        }
      }
      //console.log("problemid:",problemid)

      problem.find({id:{$in:problemid}},(err,problem) => {
        "use strict";
        if(err){
          console.log("查找题目信息失败")
        }
        else{
          //data2 = problem
          //console.log("problem:",problem)
          var list2 = []
          for(i=0;i<problem.length;i++){
            var temp = {
              "title":problem[i].title,
              "type":problem[i].type
            }
            list2.push(temp)
          }
          //console.log("list2:",list2)
          //console.log("list1:",list1)

          var finallist = []
          for(i=0;i<list1.length;i++){
            var temp = {
              "judgement":list1[i].judgement,
              "score":list1[i].score,
              "interview":list1[i].interview,
              "date":list1[i].date,
              "title":list2[i].title,
              "type":list2[i].type
            }
            finallist.push(temp)
          }
          console.log("finallist:",finallist)


          res.json({
            status: 0,
            result: {
              list: finallist
            }
          })
        }
      })

      //console.log("templist:",templist)

    }
  })

});


module.exports = router;