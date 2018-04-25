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
module.exports = mongoose.model("scores",scoresSchema,"scores")