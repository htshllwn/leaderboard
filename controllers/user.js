const jwt = require('jsonwebtoken');
const config = require('../helpers/mongoose/mongoose-connection');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const userController = {};

userController.register = function (req, res) {

    if (req.user.type != "SUPERUSER") {
        return res.json({
            success: false,
            message: "You don't have the rights to create a new user"
        });
    }

    if (req.body.username == "" || !req.body.username ||
        req.body.password == "" || !req.body.password) {
        return res.json({ success: false, message: 'username or password missing' });
    }

    let newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, message: 'Failed to register user' });
        } else {
            res.json({ success: true, message: 'User registered' });
        }
    });
}

// Authenticate
userController.authenticate = function (req, res) {
    if (req.body.username == "" || !req.body.username ||
        req.body.password == "" || !req.body.password) {
        return res.json({ success: false, message: 'username or password missing' });
    }

    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    message: 'Authenticated Successfully!',
                    data: {
                        bearerToken: token,
                        user: {
                            id: user._id,
                            username: user.username
                        }
                    }
                });
            } else {
                return res.json({ success: false, message: 'Wrong password' });
            }
        });
    });
}

// Profile
userController.profile = function (req, res) {
    res.json({ user: req.user });
}

// router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
//     res.json({ user: req.user });
// });

module.exports = userController;
