var mongoose = require('mongoose')

var slideShowsSchema = new mongoose.Schema({
    img:{
        type: String
    },
    title: {
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
//去掉自动加入的-v：0
module.exports = mongoose.model("slideShows",slideShowsSchema,"slideShows")