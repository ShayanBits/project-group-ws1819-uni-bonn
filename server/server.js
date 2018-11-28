const express = require('express')
const app = express()
const port = process.env.port || 3000;
const MongoClient = require('mongodb').MongoClient

const mongoUrl = 'mongodb://127.0.0.1:27017'
const mongoDbName = 'gallery'

app.use(express.static(__dirname + "/public"))


app.post('/api/getImageJson', (req, res) => {
  const client = new MongoClient(mongoUrl)
  client.connect(function (err) {
    console.log(err)
    const db = client.db(mongoDbName)
    console.log('db established')

    getImageMetaData(db, function (docs) {
      res.send({images: docs})
      client.close()
    })
  })
})

app.get('/insertImages', (req, res) => {
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

function getImageMetaData(db, callback) {
  const collection = db.collection('images_metadata')

  collection.find({}).toArray(function (err, docs) {
    callback(docs)
  })
}