var express = require('express');
var router = express.Router();
var qiniuConfig = require('./qiniuConfig');
// var token = qiniuConfig()
router.get('/', (req, res) => {
    var token = qiniuConfig()
    res.json({
        data: token,
        code: 200,
        msg: 'success',
        ret: true
    })
})


module.exports = router;