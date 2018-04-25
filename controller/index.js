const {Router} = require("express");
const router = Router();


// var jwt = require('express-jwt');
var session = require('express-session')
router.use(session({
    secret: 'llt',  //加严加密
    resave: false,  //是否重新保存session
    saveUninitialized: false,  //是否保存未被初始化的session
    cookie: { secure: false }   //是否是安全的cookie，安全就是HTTPS

}))

router.use("/login", require("./routes/login"));
router.use("/news", require("./routes/news"));
router.use("/pics", require("./routes/pics"));
router.use("/getData", require("./routes/getdata"));



router.use((req,res,next)=>{
    if(req.session.user){
        next()
    }else{
        res.json({
            data: '用户未登录',
            msg: '用户未登录',
            code: 401,
            ret: false
        })
        return
    }
})

router.use("/uploadToken", require("../uiti/qiniu"));
router.use("/out", require("./routes/out"));
router.use("/changePwd", require("./routes/changePwd"));
router.use("/changeInfo", require("./routes/changeInfo"));
router.use("/getInfo", require("./routes/getInfo"));
router.use("/audit", require("./routes/audit"));
router.use("/invit", require("./routes/invit"));
router.use("/revert", require("./routes/revert"));
router.use("/discuss", require("./routes/discuss"));
router.use("/summary", require("./routes/personSummary"));
router.use("/score", require("./routes/score"));

// router.use("/users", require("./users"));

// router.use(jwt({ secret: 'liu'}).unless({path: ['/getToken']}));

module.exports = router;