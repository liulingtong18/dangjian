var express = require('express');
var router = express.Router();
let news = require('../../config/model/news');
var scores = require('../../config/model/score')

router.post("/get", (req, res) => {
    let {type,id, pn = 1,pnSize=10} = req.body
    let scoreName = '';
    let type1 = '';
    let score = '';
    let params = {
        type:type
    };
    if(!id){  //没有传id
        params = {
            type:type
        };
    }else{
        params._id = id
    }
    news.find(params).sort({_id:-1}).skip((pn-1)*pnSize).limit(pnSize).exec((err,data)=>{//exec检索字符串是否存在
        if(err){
            res.json({
                data: err,
                code: 500,
                msg: '查询失败',
                ret: false
            });
            return
        }
        if(id){
            news.update({_id: id},{$set:{eye:data[0].eye+1}},(err,datas)=>{
                if(err){
                    res.json({
                        data: err,
                        code: 500,
                        msg: '修改失败',
                        ret: false
                    })
                    return
                }
                if(datas.n == 0){
                    //数据库查找不到指定ID
                    res.json({
                        data: '无效的id',
                        code: 400,
                        msg: '无效的id',
                        ret: false
                    })
                }else{
                    res.json({
                        data: data,
                        code: 200,
                        msg: 'success',
                        ret: true
                    })
                }
            })
            if(req.session.user){
                switch(type){
                    case '1':
                        scoreName="查看新闻眼";
                        type1 = 2;
                        score = 0.1;
                        break;
                    case '2':
                        scoreName="学习党建知识";
                        type1 = 3;
                        score = 1;
                        break;
                    case '4':
                        scoreName="随时随地学";
                        type1 = 4;
                        score = 1;
                        break;
                    case '5':
                        scoreName="制度建设";
                        type1 = 5;
                        score = 1;
                        break;
                    case '6':
                        scoreName="参加特色活动";
                        type1 = 6;
                        score = 1;
                        break;
                    case '7':
                        scoreName="政治学习";
                        type1 = 7;
                        score = 1;
                        break;
                    case '8':
                        scoreName="查看通知";
                        type1 = 8;
                        score = 1;
                        break;
                    case '9':
                        scoreName="随时随地拍";
                        type1 = 9;
                        score = 1;
                        break;

                }
                scores.create({user_id:req.session.user._id,username:req.session.user.username,type:type1,score,scoreName}).then(data=>{
                    console.log('success')
                })
            }
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