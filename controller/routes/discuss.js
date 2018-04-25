const {Router} = require("express");
const router = Router();
const discuss = require("../../config/model/discuss");
const userscategory = require("../../config/model/userscategory");
let users = require('../../config/model/users');


//获取民主评议
router.get("/getDiscuss",(req,res)=>{
    discuss.findOne({status: 1},(err,data)=>{
        if(data==null){
            res.json({
                data: null,
                code: 200,
                msg: '当前没有开启的民主评议'
            })
            return
        }
        res.json({
            data,
            code: 200,
            msg: 'success'
        })
    })
})

//获取用户分类
router.get('/getBranch',(req,res)=>{
    userscategory.find().sort({_id:-1}).then(data=>{
        res.json({
            data:data,
            code: 200,
            msg: "success"
        })
    })
})
//获取参加民主评议的人员
router.post('/getUserList',(req,res)=>{
    let {page = 1, pageSize = 10,branchId} = req.body;
    users.find({branchId},{pwd:0}).sort({_id: -1}).limit(pageSize).skip((page-1)*pageSize).then(data=>{
        res.json({
            data,
            code: 200,
            msg: 'success'
        })
    }).catch(err=>{
        next(new Error((err)))
    })
})
module.exports = router