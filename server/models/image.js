const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema({
    label: String,
    author: String,
    path: String,
    tags: [String],
}, {collection: 'images_metadata'})

const Image = mongoose.model('Image', imageSchema)

module.exports = Image
