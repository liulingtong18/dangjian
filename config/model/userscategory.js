const mongoose = require("mongoose")


const usersCategory = new mongoose.Schema({
    label:{
        type:String
    },
    value: {
        type: String,
        unique: true
    }

},{versionKey: false, timestamps: {createAt: "createTime",updateAt: "updateTime"}})

module.exports = mongoose.model("usersCategory", usersCategory,"usersCategory")