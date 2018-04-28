var mongoose = require('mongoose')

var slideShowsSchema = new mongoose.Schema({
    img:{
        type: String
    },
    title: {
        type: String
    }
},{versionKey: false,timestamps: {createAt: "createTime",updateAt: "updateTime"}})
//去掉自动加入的-v：0
module.exports = mongoose.model("slideShows",slideShowsSchema,"slideShows")