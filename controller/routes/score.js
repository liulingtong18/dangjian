var express = require('express');
var router = express.Router();
let score = require('../../config/model/score');


router.get("/get",(req,res)=>{
    var user_id  = req.session.user._id;
    let { pn = 1} = req.query;
    score.find({user_id}).skip((pn-1)*10).sort({_id:-1}).limit(10).exec((err,data)=>{
        score.count(true).then(data1=>{
            score.create({user_id:req.session.user._id,username:req.session.user.username,type:11,score: 0.1,scoreName: '查看积分'}).then(data=>{
                console.log('success')
            })
            res.json({
                data: data,
                code: 200,
                msg: 'success',
                total: data1
            })
        })
    })
})
module.exports = router