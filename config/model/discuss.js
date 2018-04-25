const mongoose = require("mongoose")

//发起的民主评议
const discuss = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    contentText:{
        type: String
    },
    status:{
        type: Number,   //民主评议的状态，0是新添加的，1是 已开启，2是已关闭的
        default: 0
    }


},{versionKey: false, timestamps: {createAt: "createTime",updateAt: "updateTime"}})


module.exports = mongoose.model("discuss", discuss,"discuss")