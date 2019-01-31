const express = require('express')
const router = express.Router()
const multer = require('multer')
const mime = require('mime')
const jwt = require('jsonwebtoken')
const config = require('../config.js')



const Image = require('../models/image')
const Tag = require('../models/tag')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/')
    },
    filename: (req, file, cb) => {
        const allowed = /jpeg|jpg|png/
        const valid = allowed.test(file.mimetype)
        if (valid) {
            cb(null, Date.now() + '.' + mime.getExtension(file.mimetype))
        } else {
            cb('Error: wrong filetype')
        }
    },
})

const upload = multer({storage})

//add middleware only for the following subrouter

const checkAccess = function (req,res,next) {
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
    }
    else req.responseText = 'Please log in to be able to upload pictures'
    // res.status(401).send('You need to be logged in to be able to upload pictures\'')
    next()
}

router.use('/images/upload', checkAccess )

router.post('/getImageJson', (req, res) => {
    Image
        .find()
        .populate('user', 'name')
        .exec((err, images) => {
            res.send({images})
        });
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
router.post('/images/upload', upload.single('image'), (req, res) => {
    if (req.file && req.haveAccess) {
        const tags = JSON.parse(req.body.tags)
        Image.create({
            user: req.user,
            label: req.body.label,
            path: req.file.filename,
            tags: tags,
        }, (err, i) => {
            res.send({success: true, message: 'image saved', image: i})
        })
        if(tags.length > 0) {
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
        res.send('wrong filetype or permission denied ' + req.responseText)
    }
})


module.exports = router
