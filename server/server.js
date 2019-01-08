const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
const mime = require('mime')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



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

app.use(allowCrossDomain)

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

mongoose.connect(mongoUrl + '/' + mongoDbName, {useNewUrlParser: true})

const Image = require('./models/image')
const Tag = require('./models/tag')

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

app.post('/api/getImageJson', (req, res) => {
    Image.find((err, images) => {
        res.send({images})
    })
})

app.post('/api/getTag', (req, res) => {
    const {name} = req.body
    Tag.find({name}, (err, tags) => {
        res.send(tags)
    })
})

app.post('/api/getTags', (req, res) => {
    Tag.find((err, tags) => {
        res.send(tags)
    })
})

app.post('/api/images/upload', upload.single('image'), (req, res, next) => {
    if (req.file) {
        const tags = JSON.parse(req.body.tags)
        Image.create({
            label: req.body.label,
            path: req.file.filename,
            tags: tags,
        }, (err, i) => {
            res.send({success: true, message: 'image saved', image: i})
        })
        tags.forEach(tag => {
            Tag.find({name: tag}, (err, foundTags) => {
                if (foundTags.length === 0) {
                    Tag.create({name: tag, images: 1})
                } else {
                    Tag.findOneAndUpdate({_id: foundTags[0].id}, {$inc: {'images': 1}}).exec()
                }
            })
        })
    } else {
        res.send('wrong filetype')
    }
})


// register new user

router.post('/register', function(req, res) {
    // TODO: anpassung von DB queries zu Mongo DB
    db.insert([
            req.body.name,
            req.body.email,
            bcrypt.hashSync(req.body.password, 8)
        ],
        function (err) {
            if (err) return res.status(500).send("There was a problem registering the user.")
            db.selectByEmail(req.body.email, (err,user) => {
                if (err) return res.status(500).send("There was a problem getting user")
                let token = jwt.sign({ id: user.id }, config.secret, {expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ auth: true, token: token, user: user });
            });
        });
});


// Register new admin

router.post('/register-admin', function(req, res) {
    db.insertAdmin([
            req.body.name,
            req.body.email,
            bcrypt.hashSync(req.body.password, 8),
            1
        ],
        function (err) {
            if (err) return res.status(500).send("There was a problem registering the user.")
            db.selectByEmail(req.body.email, (err,user) => {
                if (err) return res.status(500).send("There was a problem getting user")
                let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ auth: true, token: token, user: user });
            });
        });
});


// login

router.post('/login', function (req, res) {
    db.selectByEmail(req.body.email, (err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass);
        if (!passwordIsValid) return res.status(401).send({auth: false, token: null});
        let token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({auth: true, token: token, user: user});
    });
});


app.use(router)

app.listen(port, '0.0.0.0')

console.log('server started ' + port)
