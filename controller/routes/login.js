
var express = require('express');
var router = express.Router();
var users = require('../../config/model/users')
var score = require('../../config/model/score')
var validator = require('validator')
var md5 = require('blueimp-md5')


// var jwt = require('jsonwebtoken');

/* GET home page. */

// router.get('/getToken', function(req, res, next) {
//     var token = jwt.sign({
//         data: 'foobar'
//     }, 'liu', { expiresIn: '1h' });
//     res.json({
//         token:token
//     })
// });
router.post('/',(req,res)=>{
    let {pwd,idCard} = req.body
    if(!idCard||validator.isEmpty(idCard.trim())){
        res.json({
            data: '用户名不合法',
            code: 400,
            msg: '用户名不合法',
            ret: false
        })
        return
    }
    if(!pwd||validator.isEmpty(pwd.trim())){
        res.json({
            data: '密码不合法',
            code: 400,
            msg: '密码不合法',
            ret: false
        })
        return
    }else{
        //登录验证
        users.findOne({idCard},(err,data)=>{
            if(err){
                res.json({
                    data: err,
                    code: 500,
                    msg: '登陆失败',
                    ret: false
                })
                return
            }
            if(data==null){
                res.json({
                    data: "用户名不存在",
                    code: 400,
                    msg: '用户名不存在',
                    ret: false
                })
                return
            }
            if(md5(pwd)==data.pwd){
                req.session.user =data
                res.json({
                    data: "登陆成功",
                    code: 200,
                    msg: '登陆成功',
                    ret: true,
                })
                score.create({user_id:req.session.user._id,username:req.session.user.username,type:1,score: 0.1,scoreName: '登录'}).then(data=>{
                    console.log('success')
                })
                return
            }
            else{
                res.json({
                    data: "用户名与密码不匹配",
                    code: 400,
                    msg: '用户名与密码不匹配',
                    ret: false
                })
                return
            }
        })
    }
})

module.exports = router;
