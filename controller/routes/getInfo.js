var express = require('express');
var router = express.Router();
let users = require('../../config/model/users');
let score = require('../../config/model/score');
router.post("/",(req,res)=>{
    var user_id  = req.session.user._id
    users.findOne({_id:user_id},(err,data)=> {
        if (err) {
            res.json({
                data: err,
                code: 500,
                msg: "false",
                ret: false
            })
            return
        }
        score.aggregate([{$group:{_id:"$user_id",allscore:{$sum:"$score"}}}]).then(data=>{
            data.forEach(val=>{
                if(val._id==user_id){
                    users.update({_id:val._id},{$set:{allscore:parseInt(val.allscore*10)/10}}).then(data=>{
                        console.log(data);
                    })
                }
            })
        })
        res.json({
            data: data,
            code: 200,
            msg: 'success'
        })
    })
})


module.exports = router;
