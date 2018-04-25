var express = require('express');
var router = express.Router();
let users = require('../../config/model/users');
let score = require('../../config/model/score');

router.post("/",(req,res)=>{
    var user_id  = req.session.user._id;
    let {header,username,hometown,address,nation,wxNum,qqNum,sex,education,jobRank,salary,joinTime,payTime,partyStatus} = req.body
    users.update({_id:user_id},{$set:{header,username,hometown,address,nation,wxNum,qqNum,sex,education,jobRank,salary,joinTime,payTime,partyStatus}},(err,data)=> {
        if (err) {
            res.json({
                data: err,
                code: 500,
                msg: "false",
                ret: false
            })
            return
        }
        score.create({user_id,username:req.session.user.username,type:14,score: 0.1,scoreName: '完善个人信息'}).then(data=>{
            console.log('success')
        })
        res.json({
            data: 'success',
            code: 200,
            msg: 'success',
            ret: true
        })
    })
})


module.exports = router;
