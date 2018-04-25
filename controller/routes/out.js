var express = require('express');
var router = express.Router();
// var crmUsers = require('../../config/modules/crmUsers')
// var validator = require('validator')

router.post('/',(req,res)=>{
    req.session.user = ''
    // console.log(req.session.user)
    res.json({
        data: "退出成功",
        code: 200,
        msg: '退出成功',
        ret: true,
    })
})
module.exports = router;
