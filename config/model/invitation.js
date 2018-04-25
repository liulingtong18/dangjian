var mongoose = require('mongoose')

var invitsSchema = new mongoose.Schema({
    user_id:{
        type: String
    },
    username:{
        type: String
    },
    header:{
        type: String
    },
    content:{
        type: String
    },
    commentCount:{    //跟帖的数目
        type: Number,
        default: 0
    },
    type:{
        type: Number,
        default: 1
    },
    createTime:{
        type: Date,
        default: Date.now()
    },
    updateTime: {
        type: Date,
        default: Date.now()
    }
},{versionKey: false})
//去掉自动加入的-v：0u
module.exports = mongoose.model("invits",invitsSchema,"invits")