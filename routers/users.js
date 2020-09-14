//user registration/login/logout
const express = require('express')
var bodyParser = require('body-parser')
const Users = require('../models/user')
const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.route('/signup').
    post((req, res, next) => {
    Users.findOne({ username: req.body.username })
        .then(user => {
            if (user != null) {
                var err = new Error('User already exit!');
                res.statusCode = 403;
                next(err);
            } else {
                return Users.create({ username: req.body.username, password: req.body.password }).
                    then(result => {
                        res.statusCode === 201;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(result)
                    }, error => {
                        next(error);
                    })
            }

        }, error => { next(error) }).
        catch(error => {
            next(error)
        })
    })

    userRouter.route('/login').
    post((req, res, next) => {
        if (!req.session.user) {
            var authHeaders = req.headers.authorization;

            if (!authHeaders) {
              var error = new Error('Your Are Not Authenticated');
              res.setHeader('WWW-Authenticate', 'Basic')
              res.statusCode = 401;
              next(error)
              return;
            }
        
            var auth = new Buffer.from(authHeaders.split(' ')[1], 'base64').toString().split(':');
            var username = auth[0];
            var password = auth[1];

            Users.findOne({ username: username }).then(user=>{
              if(user===null){
                var error = new Error('User not exit');
                res.statusCode = 403;
                next(error)
                return; 
              }else if(user.password!==password){
                var error = new Error('password incorrect');
                res.statusCode = 403;
                next(error)
                return; 
              }else if(user.username===username && user.password===password){
                  req.session.user = "authenticate"
                  res.setHeader('Content-Type', 'text/plain');
                  res.statusCode = 200;
                  res.send('authenticate success')
              }

            },error=>{
                next(error);
            })

        } else {
            res.setHeader('Content-Type', 'text/plain');
           res.statusCode = 200;
           res.send('You are already authenticated!!')
        }
    })

userRouter.route('/logout').
    get((req, res, next) => {
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