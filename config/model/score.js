var mongoose = require('mongoose')

var scoresSchema = new mongoose.Schema({
    user_id:{
        type: String
    },
    username:{
        type: String
    },
    type:{
        type: Number
    },
    scoreName:{
        type: String
    },
    score:{
        type: Number,
        default: 0
    }
},{versionKey: false,timestamps: {createAt: "createTime",updateAt: "updateTime"}})
//去掉自动加入的-v：0u
module.exports = mongoose.model("scores",scoresSchema,"scores")