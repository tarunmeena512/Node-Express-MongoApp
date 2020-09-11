const express = require('express')
var bodyParser = require('body-parser')

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/').
    all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.send('Will Send All leader!')
    }).
    post((req, res, next) => {
        res.send('Will Send All leader!')
    }).
    put((req, res, next) => {
        res.send('Will Send All leader!')
    }).
    delete((req, res, next) => {
        res.send('Will Send All leader!')
    });
leaderRouter.route('/:leaderId').
    all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.send('Will Send All leader!')
    }).
    post((req, res, next) => {
        res.send('Will Send All leader!')
    }).
    put((req, res, next) => {
        res.send('Will Send All leader!')
    }).
    delete((req, res, next) => {
        res.send('Will Send All leader!')
    });

module.exports = leaderRouter;