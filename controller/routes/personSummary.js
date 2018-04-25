const {Router} = require('express');
const router = Router();
const PS = require('../../config/model/personSummary')
const discuss = require("../../config/model/discuss");
const score = require("../../config/model/score");

router.post('/add',(req,res)=>{
    let {pic,discussId} = req.body
    let userId = req.session.user._id
    let username = req.session.user.username
    let branchId = req.session.user.branchId
    let branchName = req.session.user.branchName
    if(!pic){
        res.json({
            data: '个人总结不能为空',
            code: 400,
            msg: '个人总结不能为空'
        })
    }else{
        PS.findOne({discussId, userId}).then(data=>{
            if(data==null){
                discuss.findOne({_id:discussId},(err,data)=>{
                    PS.create({pic,discussId,userId,discussName:data.title,username,branchName,branchId,common:[]}).then(data=>{
                        res.json({
                            data: 'success',
                            code: 200,
                            msg: 'success'
                        })
                    })
                })

            }else{
                res.json({
                    data: '个人总结不能重复提交',
                    code: 400,
                    msg: '个人总结不能重复提交'
                })
            }
        }).catch(err=>{
            next(new Error(err))
        })
    }
})
//获取他人总结
router.get('/getOther',(req,res)=>{
    let {discussId,otherUserId} = req.query
    PS.findOne({discussId, userId:otherUserId, status: 1}).then(data=>{
        if(data == null){
            res.json({
                data: null,
                code: 200,
                msg: '该用户没完善个人总结'
            })
            return
        }
        res.json({
            data: data,
            code: 200,
            msg: 'success'
        })
    })
})

router.post("/addSummary",(req,res)=>{
    let {id,status} = req.body
    let userId = req.session.user._id

    PS.update({_id:id},{$push: {common:{userId,status}}}).then(data=>{
        res.json({
            data: '评论插入成功',
            code: 200,
            msg: '评论插入成功'
        })
    })
})
module.exports = router