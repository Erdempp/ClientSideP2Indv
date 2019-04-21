const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = {

    login(req, res, next) {
        const userProps = req.body;
        
        User.findOne({ email : userProps.email })
        .then((user)=> {
            if (user.isValid(userProps.password)){
                try {
                    let token = jwt.sign({ email: user.email }, 'secret', { expiresIn: '1d' })
                    return res.status(200).json(token);
                }
                catch(error) {
                    next(error);
                }
            }
            else {
                res.status(401).send({ Error: 'Invalid password' })
            }
        }).catch(() => res.status(404).send({ Error : 'User not found' }));
    },

    register(req, res, next) {
        const userProps = req.body;

        User.findOne({ email: userProps.email })
        .then((userFound) => {
            if(userFound == null) {
                const user = new User({
                    email: userProps.email,
                    name: userProps.name,
                    password: User.hashPassword(userProps.password)
                })
                user.save()
                    .then((createdUser) => res.status(200).send({ Message: 'User successfully registered' }))
                    .catch(next);
            }
            else {
                res.status(401).send({ Error: 'An user with this email already exists' })
            }
        })
        
    }

}