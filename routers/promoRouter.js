const express = require('express')
var bodyParser = require('body-parser')
const Promotion = require('../models/promotions')
const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .get((req, res, next) => {
        Promotion.find({}).exec()
        .then(promotion => {
            console.log(promotion)
            res.statusCode === 200
            res.setHeader('Content-Type', 'application/json');
            res.json(promotion)
        }, error => { next(error) }).
        catch(error => {
            next(error)
        })
    }).
    post((req, res, next) => {
        Promotion.create(req.body)
        .then(promotion => {
            console.log('promotion Created');
            res.statusCode === 201
            res.setHeader('Content-Type', 'application/json');
            res.json(promotion)
        }, error => { next(error) }).
        catch(error => {
            next(error)
        })
    }).
    put((req, res, next) => {
        res.send('Put Not Allowed')
    }).
    delete((req, res, next) => {
        Promotion.remove({})
            .then(result => {
                console.log('Promotions Deleted');
                res.statusCode === 200
                res.setHeader('Content-Type', 'application/json');
                res.json(result)
            }, error => { next(error) }).
            catch(error => {
                next(error)
            })
    });
//handling promotionId
promoRouter.route('/:promotionId')
    .get((req, res, next) => {
        Promotion.findById(req.params.promotionId)
            .then(promotion => {
                res.statusCode === 200
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion)
            }, error => { next(error) }).
            catch(error => {
                next(error)
            })
    }).
    post((req, res, next) => {
        res.send('Post Not allowed');
    }).
    put((req, res, next) => {
        Promotion.findByIdAndUpdate(req.params.promotionId, {
            $set: req.body
        }, { new: true })
            .then(promotion => {
                res.statusCode === 200
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion)
            }, error => { next(error) }).
            catch(error => {
                next(error)
            })
    }).
    delete((req, res, next) => {
        Promotion.findByIdAndRemove(req.params.promotionId)
            .then(result => {
                res.statusCode === 200
                res.setHeader('Content-Type', 'application/json');
                res.json(result)
            }, error => { next(error) }).
            catch(error => {
                next(error)
            })
    });
   

module.exports = promoRouter;