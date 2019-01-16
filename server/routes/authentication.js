const User = require('../models/user')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config.js')

function encryptPassword(password) {
    return bcrypt.hashSync(password, 8)
}

function createUserAndSendToken(res, name, email, pass, isAdmin = false) {
    User.create({name, email, pass, isAdmin}, function (err, user) {
        if (err) {
            return res.status(500).send('There was a problem registering the user.')
        }
        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 1000 , // expires in 24 hours 86400
        })
        res.status(200).send({auth: true, token, user})
    })
}

module.exports = function (router) {
    router.post('/register', function (req, res) {
        const {name, email, password} = req.body
        createUserAndSendToken(res, name, email, encryptPassword(password))
    })

    router.post('/register-admin', function (req, res) {
        const {name, email, password} = req.body
        createUserAndSendToken(res, name, email, encryptPassword(password), true)
    })

    router.post('/login', function (req, res) {
        const {email, password} = req.body
        User.findOne({email}, (err, user) => {
            if (err) return res.status(500).send('Error on the server.')
            if (!user) return res.status(404).send('No user found.')

            const passwordIsValid = bcrypt.compareSync(password, user.pass)
            if (!passwordIsValid) {
                return res.status(401).send({auth: false, token: null})
            }
            const token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 1000 , // expires in 24 hours 86400
            })
            res.status(200).send({auth: true, token: token, user: user})
        })
    })
}
