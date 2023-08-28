const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    fname: String,
    lname: String,
    dob: Date,
    phone: {type: Number, unique: true},
    accountType: [String],
    about: String,
    photo: String,
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel