const mongoose = require("mongoose");

const personSummary = new mongoose.Schema({
    pic: {
        type: Array
    },
    status: {
        type: Number,     //0代表未审核刚添加 1代表审核通过 2代表审核不通过
        default: 0
    },
    userId: {
        type: String,   //用户的ID
        index: true
    },
    username: {
        type: String,   //用户的姓名
        index: true
    },
    discussId: {   //民主评议的id
        type: String,
        index: true
    },
    discussName: {   //民主评议的id
        type: String,
        index: true
    },
    branchId: {   //分类ID
        type: String,
        index: true
    },
    branchName: {   //分类ID
        type: String,
        index: true
    },
    common: [{
        userId: {   //评论人
            type: String
        },
        status: {  //评论内容 0优1良2中3差
            type: Number,
            default: 0
        }
    }]
}, {versionKey: false, timestamps: {createAt: "createTime",updateAt: "updateTime"}})

module.exports = mongoose.model("personSummary", personSummary)