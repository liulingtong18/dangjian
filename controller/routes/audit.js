//审核接口
var express = require('express');
var router = express.Router();
let audits = require('../../config/model/audit');
let score = require('../../config/model/score');

/* GET home page. */
router.post('/add', function(req, res, next) {
    let user_id = req.session.user._id
    let username = req.session.user.username
    let {img,kind} = req.body
    if(!img){
        // switch (kind){
        //     case 1:
        //         console.log(111)
        //         res.json({
        //             data: '思想汇报不能为空',
        //             code: 400,
        //             msg: '思想汇报不能为空'
        //         })
        //         break;
        //     case 2:
        //         res.json({
        //             data: '心得总结不能为空',
        //             code: 400,
        //             msg: '心得总结不能为空'
        //         })
        //         break;
        //     case 3:
        //         res.json({
        //             data: '个人总结不能为空',
        //             code: 400,
        //             msg: '个人总结不能为空'
        //         })
        //         break;
            if(kind == 1){
                res.json({
                    data: '思想汇报不能为空',
                    code: 400,
                    msg: '思想汇报不能为空'
                })
            }else if(kind==2){
                res.json({
                    data: '心得总结不能为空',
                    code: 400,
                    msg: '心得总结不能为空'
                })
            }
        }else{
        audits.create({img,user_id,kind,username},(err,data)=>{
            if(err){
                res.json({
                    data: err,
                    code: 500,
                    msg: '数据添加失败',
                    ret: false
                })
                return
            }
            audits.find({user_id,type:0,kind},(err,data)=>{
                if(err){
                    res.json({
                        data: err,
                        code: '400',
                        msg: 'false'
                    })
                }
                if(kind==1&&data[0].type == 1){
                    score.create({user_id:req.session.user._id,username:req.session.user.username,type:12,score: 2,scoreName: '思想汇报通过'}).then(data=>{
                        console.log('success')
                    })
                }
                if(kind==2&&data[0].type == 1){
                    score.create({user_id:req.session.user._id,username:req.session.user.username,type:13,score: 2,scoreName: '心得总结通过'}).then(data=>{
                        console.log('success')
                    })
                }
                res.json({
                    type: data[0].type,
                    isRead: data[0].isRead
                })
            })

        })
    }
});


//每次进来请求的接口
router.post('/get',(req,res)=>{
    let user_id = req.session.user._id;
    let {kind} = req.body;
    audits.findOne({user_id,kind}).sort({_id:-1}).limit(1).exec((err,data)=>{
        if(data==null){
            res.json({
                data: '没有正在审核的总结',
                code: 400,
                msg: '没有正在审核的总结'
            })
            return
        }
        res.json({
            type: data.type,
            isRead: data.isRead
        })
    })

})



module.exports = router;
