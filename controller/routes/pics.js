let express = require('express');
let router = express.Router();
let slideShows = require('../../config/model/pics');


router.get("/get", (req, res) => {
    let {id, pn = 1} = req.query;
    let params = {status:1};
    if(!id){  //没有传id
        params = {status:1}
    }else{
        params._id = id
    }
    slideShows.find(params).sort({_id:-1}).skip((pn-1)*10).limit(10).exec((err,data)=>{//exec检索字符串是否存在
        if(err){
            res.json({
                data: err,
                code: 500,
                msg: '查询失败',
                ret: false
            });
            return
        }
        res.json({
            data: data,
            code: 200,
            msg: 'success',
            ret: true
        })
    })
});
module.exports = router