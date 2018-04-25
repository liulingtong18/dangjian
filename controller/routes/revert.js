// 回复帖子
var express = require('express');
var router = express.Router();
let revert = require('../../config/model/revert');
let invits = require('../../config/model/invitation');

router.post('/',(req,res)=>{
    let user_id = req.session.user._id
    let username = req.session.user.username
    let header = req.session.user.header
    // forumId  帖子的ID
    let {comment,forumId,toUserId} = req.body
    if(!comment){
        res.json({
            data: null,
            code: 400,
            msg: '评论内容不能为空'
        })
        return
    }else{
        invits.findOne({$or:[{_id:forumId,user_id:toUserId},{forumId,user_id:toUserId}]}).then(dt=>{
            if(dt==null){
                res.json({
                    data: '非法参数',
                    code: 400,
                    msg: '非法参数'
                })
            }else{
                revert.create({comment,header,username,user_id,forumId,toUserId,toUserName:dt.username,toUserHeader:dt.header},(err,data)=>{
                    if(err){
                        res.json({
                            data: '发布失败',
                            code: 500,
                            msg: '发布失败'
                        })
                        return
                    }
                    invits.find({_id:forumId},(err,data)=>{
                        invits.update({_id:forumId},{$set:{commentCount:data[0].commentCount+1}},(err,data)=>{
                            console.log(data)
                        })
                    })
                    res.json({
                        data: "success",
                        code: 200,
                        msg: '回复成功'
                    })
                })

            }

        })
    }
})
router.get('/get',(req,res)=>{
    let {id, pn = 1} = req.query;
    let params = {

    };
        params.forumId = id
    revert.find(params).skip((pn-1)*10).sort({_id:-1}).limit(10).exec((err,data)=>{
        res.json({
            data: data,
            code: 200
        })
    })
})

module.exports = router