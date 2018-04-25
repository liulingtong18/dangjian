var mongoose = require('mongoose')

var auditsSchema = new mongoose.Schema({
    user_id:{
        type: String
    },
    username:{
        type: String
    },
    img:{
        type: Array
    },
    isRead:{
        type: Number,
        default: 0
    },
    type:{
        type: Number,
        default: 0
    },
    kind:{
        type: Number
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
module.exports = mongoose.model("audits",auditsSchema,"audits")