const User = require('../models/user')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config.js')

function encryptPassword(password) {
    return bcrypt.hashSync(password, 8)
}

function createToken({_id: id, name, email, isAdmin}, expiresIn = config.expire) {
    const user = {id, name, email, isAdmin}
    const token = jwt.sign(
        {user},
        config.secret,
        {expiresIn},
    )
    return {user, token}
}

function sendToken(res, {user, token}) {
    res.cookie('jwt', token)
    res.status(200).send({auth: true, user})
}

function createUserAndSendToken(res, name, email, pass, isAdmin = false) {
    User.create({name, email, pass, isAdmin}, function (err, user) {
        if (err) {
            return res.status(500).send('There was a problem registering the user.')
        }
        sendToken(res, createToken(user))
    })
}

module.exports = function (router) {
    router.post('/register', function (req, res) {
        const {name, email, password, isAdmin} = req.body
        createUserAndSendToken(res, name, email, encryptPassword(password), isAdmin)
    })

    router.post('/login', function (req, res) {
        const {email, password} = req.body
        User.findOne({email}, (err, user) => {
            if (err) {
                return res.status(500).send('Error on the server.')
            }

            const passwordIsValid = bcrypt.compareSync(password, user.pass)
            if (!passwordIsValid) {
                return res.status(401).send({auth: false})
            }
            sendToken(res, createToken(user))
        })
    })

    router.post('/logout', function(req, res) {
        res.clearCookie('jwt')
        res.send({})
    })

    router.post('/authenticate', function (req, res) {
        const token = req.cookies.jwt
        jwt.verify(token, config.secret, function (err, user) {
            if (err) {
                res.send(err)
            }
            res.send(user)
        })
    })
}
