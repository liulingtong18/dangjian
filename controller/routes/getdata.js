const {Router} = require("express");
const router = Router();


const getData = require('./getData/getData')

router.get('/get',(req,res,next)=>{
    getData().then(data => {
        if(req.session.user){
            score.create({user_id:req.session.user._id,username:req.session.user.username,type:15,score: 0.1,scoreName: '学习党史'}).then(data=>{
                console.log('success')
            })
            res.json({
                data: data,
                code: 200,
                msg: "success"
            })
        }else{
            res.json({
                data: data,
                code: 200,
                msg: "success"
            })
        }
    })
})
module.exports = router