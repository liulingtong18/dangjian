var mongoose = require('mongoose')

var newsSchema = new mongoose.Schema({
    contentText:{
        type: String
    },
    content:{
        type: String
    },
    title:{
        type: String
    },
    img:{
        type: String
    },
    author:{
        type: String
    },
    eye: {
        type: Number,
        default: 0
    },
    type:{
        type: String
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
module.exports = mongoose.model("news",newsSchema,"news")