var mongoose = require('mongoose')

var revertsSchema = new mongoose.Schema({
    user_id:{
        type: String
    },
    username:{
        type: String
    },
    header:{
        type: String
    },
    comment:{
        type: String
    },
    type:{
        type: Number,
        default: 2
    },
    forumId:{
        type: String //评论的那一条的id
    },
    toUserId:{
        type: String //回复的发帖子的人的id
    },
    toUserName:{
        type: String //回复的发帖子的人的姓名
    },
    toUserHeader:{
        type: String //回复的发帖子的人的头像
    }
},{versionKey: false,timestamps: {createAt: "createTime",updateAt: "updateTime"}})
//去掉自动加入的-v：0u
module.exports = mongoose.model("reverts",revertsSchema,"reverts")