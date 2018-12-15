const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
    name: String,
    images: Number,
}, {collection: 'tags'})

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag
