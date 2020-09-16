//user registration/login/logout
const express = require('express')
var passport = require('passport');
var bodyParser = require('body-parser')
const User = require('../models/user')
const router = express.Router();

router.use(bodyParser.json());

router.post('/signup', (req, res, next) => {
    User.register(new User({ username: req.body.username }),
        req.body.password, (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({ err: err });
            }
            else {
                passport.authenticate('local')(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ success: true, status: 'Registration Successful!' });
                });
            }
        });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, status: 'You are successfully logged in!' });
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.setHeader('Content-Type', 'text/plain');
        res.send('logout success')
    } else {
        var err = new Error('YOU ARE NOT LOGGED IN');
        res.statusCode = 403;
        next(err);
    }
})

module.exports = router;
