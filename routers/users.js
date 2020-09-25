//user registration/login/logout
const express = require('express')
var passport = require('passport');
var bodyParser = require('body-parser')
const User = require('../models/user')
var authenticate = require('../authenticate');

const userRouter = express.Router();

userRouter.use(bodyParser.json());


userRouter.post('/signup', (req, res, next) => {
    User.register(new User({ username: req.body.username }),
        req.body.password, (err, user) => {
            if(err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({err: err});
              }
              else {
                if (req.body.firstname)
                  user.firstname = req.body.firstname;
                if (req.body.lastname)
                  user.lastname = req.body.lastname;
                user.save((err, user) => {
                  if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({err: err});
                    return ;
                  }
                  passport.authenticate('local')(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: true, status: 'Registration Successful!'});
                  });
                });
              }
        });
});

userRouter.post('/login', passport.authenticate('local'), (req, res) => {
    //issue token
    var token = authenticate.getToken({_id:req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, token:token,status: 'You are successfully logged in!' });
});

userRouter.get('/logout', (req, res) => {
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

module.exports = userRouter;
