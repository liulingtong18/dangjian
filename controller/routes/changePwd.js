var express = require('express');
var router = express.Router();
let users = require('../../config/model/users');
var validator = require('validator')
var md5 = require('blueimp-md5')

router.post("/",(req,res)=>{
    let {pwd,newPwd} = req.body
    if(!pwd||validator.isEmpty(pwd.trim())){
        res.json({
            data: '旧密码不合法',
            code: 400,
            msg: '旧密码不合法',
            ret: false
        })
        return
    }
    else if(!newPwd||validator.isEmpty(newPwd.trim())){
        res.json({
            data: '新密码不合法',
            code: 400,
            msg: '新密码不合法',
            ret: false
        })
        return
    }

    else{
        var user_id  = req.session.user._id
        users.findOne({_id:user_id},(err,data)=>{
            if(err){
                res.json({
                    data: err,
                    code: 500,
                    msg: "false",
                    ret: false
                })
                return
            }
            if(md5(pwd) == data.pwd){

                users.update({_id:user_id},{$set:{pwd:md5(newPwd)}},(err,data)=>{
                    if (err){
                        res.json({
                            data: err,
                            code: 500,
                            msg: 'false',
                            ret: false
                        })
                        return
                    }
                    res.json({
                        data: '密码修改完成',
                        code: 200,
                        msg: '密码修改完成',
                        ret: true
                    })
                })
            }else{
                res.json({
                    data: '旧密码不正确',
                    code: 400,
                    msg: '旧密码不正确',
                    ret: false
                })
                return
            }
        })
    }
})

module.exports = router;
