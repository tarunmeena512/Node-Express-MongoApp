const express = require('express')
var bodyParser = require('body-parser')

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/').
    all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.send('Will Send All promotion!')
    }).
    post((req, res, next) => {
        res.send('Will Send All promotion!')
    }).
    put((req, res, next) => {
        res.send('Will Send All promotion!')
    }).
    delete((req, res, next) => {
        res.send('Will Send All promotion!')
    });

promoRouter.route('/:promotionId').
    all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.send('Will Send All promotion!')
    }).
    post((req, res, next) => {
        res.send('Will Send All promotion!')
    }).
    put((req, res, next) => {
        res.send('Will Send All promotion!')
    }).
    delete((req, res, next) => {
        res.send('Will Send All promotion!')
    });
   

module.exports = promoRouter;