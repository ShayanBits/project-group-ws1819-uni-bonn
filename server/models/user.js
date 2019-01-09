const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    pass: {type: String, required: true},
    isAdmin: {type: Boolean, required: false, default: false},
}, {collection: 'users'})

const User = mongoose.model('User', userSchema)

module.exports = User
