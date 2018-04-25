//帖子接口
var express = require('express');
var router = express.Router();
let invits = require('../../config/model/invitation');
let score = require('../../config/model/score');

router.post('/add',(req,res)=>{
    let user_id = req.session.user._id
    let username = req.session.user.username
    let header = req.session.user.header
    let {content} = req.body
    if(!content){
        res.json({
            data: null,
            code: 400,
            msg: '帖子内容不能为空'
        })
        return
    }else{
        invits.create({content,header,username,user_id},(err,data)=>{
            if(err){
                res.json({
                    data: '发布失败',
                    code: 500,
                    msg: '发布失败'
                })
                return
            }
            score.create({user_id:req.session.user._id,username:req.session.user.username,type:10,score: 0.1,scoreName: '互动发帖'}).then(data=>{
                console.log('success')
            })
            res.json({
                data: data,
                code: 200,
                msg: '发布成功'
            })
        })
    }
})

router.get('/get',(req,res)=>{
    let {id, pn = 1,pnSize=10} = req.query;
    let params = {};
    if(!id){  //没有传id
        params = {};
    }else{
        params._id = id
    }
    invits.find(params).skip((pn-1)*pnSize).sort({_id:-1}).limit(pnSize).exec((err,data)=>{
        res.json({
            data: data,
            code: 200
        })
    })
})
module.exports = router