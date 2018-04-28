var mongoose = require('mongoose')

var usersSchema = new mongoose.Schema({
    address:{
        type: String//地址
    },
    username:{
        type: String //用户姓名
    },
    birthday:{
        type: String//生日
    },
    education:{
        type: String //最高学历

    },
    hometown:{
        type: String //家庭住址

    },
    header:{
        type: String  //头像
    },
    sex:{
      type: Number, //性别
      defaule: 1
    },
    age:{
        type: String  //年龄
    },
    pwd:{
        type: String  //密码
    },
    qqNum: {
        type: Number
    },
    wxNum: {
        type: String
    },
    idCard:{
        type: Number//账号
    },
    branchId:{
        type: String   //用户分类id
    },
    branchName:{
        type: String    //用户分类名称
    },
    partyStatus:{    //当前身份对应的数值
        type: Number,
        default: 0
    },
    partyIdentity:{    //当前身份
        type: String
    },
    allscore:{
        type: Number  //积分数
    },
    nation:{
        type: String //民族
    },
    jobRank:{
        type: String   //职称
    },
    salary:{
        type: String   //薪资水平
    },
    joinTime:{   //入党时间
        type: Date
    },
    payTime:{   //党费最后缴纳时间
        type: Date
    }
},{versionKey: false,timestamps: {createAt: "createTime",updateAt: "updateTime"}})
//去掉自动加入的-v：0
module.exports = mongoose.model("users",usersSchema,"users")