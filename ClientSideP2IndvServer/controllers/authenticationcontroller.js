'use strict';

const assert = require('assert')
const ApiError = require('../ApiError')
const auth = require('../utils/authentication')
const bcrypt = require('bcryptjs')
const validateEmail = require('../utils/email.validator')

const BCRYPT_SALT_ROUNDS = 12;

module.exports = {
    validateToken(req, res, next) {
        const token = req.header('x-access-token') || ''
        console.log(token)

        auth.decodeToken(token, (err, payload) => {
            if (err) {
                next(new ApiError(err.message || err, 401))
            } else {
                next()
            }
        })
    },

    login(req, res, next) {
        try {
            assert(typeof (req.body.email) === 'string', 'email must be a string.')
            assert(validateEmail(req.body.email), 'email must be a valid email address.')
            assert(typeof (req.body.password) === 'string', 'password must be a string.')
        } catch (ex) {
            next(new ApiError(ex.toString(), 422))
            return
        }

        if( req.body.email === 'dkroeske@gmail.com' && req.body.password === 'secret') {
            console.log('*')
            const payload = {
                email: 'dkroeske@gmail.com',
                id: 'dkroeske'
            }
            res.status(200).json({
                "token": auth.encodeToken(payload),
                "email": 'dkroeske@gmail'
            });
        } else {
            next(new ApiError('unknown user'), 500)
        }
    },

    register(req, res, next) {
        res.status(200).json();
    }
}