const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
const cookieParser = require('cookie-parser')
const api = require('./routes/api')

const app = express()
const port = process.env.port || 3000

const mongoUrl = 'mongodb://127.0.0.1:27017'
const mongoDbName = 'gallery'

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

app.use(cookieParser())
app.use(allowCrossDomain)

mongoose.connect(mongoUrl + '/' + mongoDbName, {useNewUrlParser: true})


app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
require('./routes/authentication')(router)
app.use('/api',api)


app.use(router)

app.listen(port, '0.0.0.0')

console.log('server started ' + port)
