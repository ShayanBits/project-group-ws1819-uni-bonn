const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userInfoSchema = new Schema({
    id: Number,
    name: String,
    email: String,
    user_pass: String,
    is_admin: Boolean
}, {collection: 'userInfo'})

const userInfo = mongoose.model('userInfo', imageSchema)

module.exports = userInfo
