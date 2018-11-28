const express = require('express')
const app = express()
const port = process.env.port || 3000

const mongoose = require('mongoose')
const mongoUrl = 'mongodb://127.0.0.1:27017'
const mongoDbName = 'gallery'

const multer = require('multer')
const mime = require('mime')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '.' + mime.getExtension(file.mimetype))
  }
})
const upload = multer({storage})

mongoose.connect(mongoUrl + '/' + mongoDbName, {useNewUrlParser: true})

const Image = require('./models/image')

app.use(express.static(__dirname + "/public"))


app.post('/api/getImageJson', (req, res) => {
  Image.find((err, images) => {
    res.send({images})
  })
})

app.post('/api/images/upload', upload.single('image'), (req, res, next) => {
  Image.create({label: req.body.label, path: req.file.filename}, (err, i) => {
    res.send('image saved')
  })
})

app.get('/insertImages', () => {
  client.connect(function () {
    const db = client.db(mongoDbName)
    db.collection('images_metadata').insertMany([
      {label: 'Butterfly', path: 'butterfly'},
      {label: 'Ducks', path: 'ducks'},
      {label: 'Fire', path: 'fire'},
      {label: 'Kings Canyon', path: 'kings_canyon'},
      {label: 'Koalas', path: 'koalas'},
      {label: 'Pink Flower', path: 'pink_flower'},
      {label: 'Stairs', path: 'stairs'},
      {label: 'Uluru', path: 'uluru'},
      {label: 'Yellow Flower', path: 'yellow_flower'}
    ])
  })
})

app.listen(port, '0.0.0.0')

console.log('server started ' + port)