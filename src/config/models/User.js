const mongoose = require('mongoose')
var passportLocalMongoose = require("passport-local-mongoose")
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    studentID: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: 'String',
        default: 'user',
        enum: ['user', 'admin']
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
})
UserSchema.plugin(passportLocalMongoose)
const User = mongoose.model('User', UserSchema)

module.exports = User