const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    mailID:{
        type:String,
        required:[true, "MailID must be provided"],
        unique:true,
    },
    password:{
        type:String,
        required: [true, "Password must be provided"],
    },
})

module.exports = mongoose.model('User',UserSchema);