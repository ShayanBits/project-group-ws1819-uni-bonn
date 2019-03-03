const express = require('express')
const router = express.Router()
const multer = require('multer')
const mime = require('mime')
const readChunk = require('read-chunk')
const fileType = require('file-type')
const jwt = require('jsonwebtoken')
const config = require('../config.js')

const Image = require('../models/image')
const Tag = require('../models/tag')

const allowedMIME = /image\/jpeg|image\/png/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '.' + mime.getExtension(file.mimetype))
  },
})

const upload = multer({storage})

//add middleware only for the following subrouter

const checkAccess = function (req, res, next) {
  req.haveAccess = false
  const token = req.cookies.jwt
  if (token !== undefined) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        console.log('JWT is not valid')
        req.responseText = 'JWT is not valid'
        // res.ok(false)
      } else {
        let expDate = decoded.exp
        console.log('Remaining valid time:', expDate - (Date.now() / 1000), ' seconds')
        req.responseText = 'JWT is valid'
        req.haveAccess = true
        req.user = decoded.user
      }
    })
  } else req.responseText = 'Please log in to be able to upload pictures'
  // res.status(401).send('You need to be logged in to be able to upload pictures\'')
  next()
}

router.post('/getImageJson', (req, res) => {
  Image
    .find()
    .populate('user', 'name')
    .exec((err, images) => {
      res.send({images})
    })
})

router.use('/updateImageData', checkAccess)
router.post('/updateImageData', (req, res) => {
  const {_id, label} = req.body
  Image.findOne({_id}).populate('user').exec((err, image) => {
    if (err) {
      res.send({error: 404, message: 'Image not found'})
    }
    if (req.haveAccess && req.user.id === image.user._id.toString()) {
      image.label = label
      image.save((err, image) => {
        if (err) {
          return console.log(err)
        }
        res.send({error: 0, message: 'Image updated', image})
      })
    } else {
      res.send({error: 403, message: 'Unauthorized'})
    }
  })
})

router.use('/deleteImage', checkAccess)
router.post('/deleteImage', (req, res) => {
  const {_id} = req.body
  Image.findOne({_id}).populate('user').exec((err, image) => {
    if (err) {
      res.send({error: 404, message: 'Image not found'})
    }
    if (req.haveAccess && req.user.id === image.user._id.toString()) {
      Image.findByIdAndRemove(_id, errRemove => {
        if (err) {
          return console.log(err)
        }
        res.send({error: 0, message: 'Image deleted'})
      })
    } else {
      res.send({error: 403, message: 'Unauthorized'})
    }
  })
})

router.post('/getTag', (req, res) => {
  const {name} = req.body
  Tag.find({name}, (err, tags) => {
    res.send(tags)
  })
})

router.post('/getTags', (req, res) => {
  Tag.find((err, tags) => {
    res.send(tags)
  })
})

router.use('/images/upload', checkAccess)
router.post('/images/upload', upload.single('image'), (req, res) => {
  if (req.haveAccess) {
    if (req.file) {
      const buffer = readChunk.sync(req.file.path, 0, fileType.minimumBytes)
      const bufferFileType = fileType(buffer)
      const valid = allowedMIME.test(bufferFileType.mime)
      if (valid) {
        const tags = JSON.parse(req.body.tags)
        Image.create({
          user: req.user.id,
          label: req.body.label,
          path: req.file.filename,
          tags: tags,
        }, (err, i) => {
          res.send({success: true, message: 'image saved', image: i})
        })
        if (tags.length > 0) {
          tags.forEach(tag => {
            Tag.find({name: tag}, (err, foundTags) => {
              if (foundTags.length === 0) {
                Tag.create({name: tag, images: 1})
              } else {
                Tag.findOneAndUpdate({_id: foundTags[0].id}, {$inc: {'images': 1}}).exec()
              }
            })
          })
        }
      } else {
        res.send('Wrong filetype')
      }
    }
  } else {
    res.send('Permission denied ' + req.responseText)
  }
})


module.exports = router
