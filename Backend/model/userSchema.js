const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required : true
    },
    otp:{
        type: String,
        required : true
    },
    verify:{
        type: Boolean,
        default: false
    },
    role:{
        type: String,
        enum:["User","Admin","Merchant"],
        default: "User"
    },
})

module.exports =  mongoose.model('User', userSchema)