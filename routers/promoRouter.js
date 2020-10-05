const express = require('express')
var bodyParser = require('body-parser')
const Promotion = require('../models/promotions')
var authenticate = require('../authenticate');
const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .get(authenticate.verifyUser,(req, res, next) => {
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
    post(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
        if(req && req.user && req.user.admin){
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
        }else{
            res.statusCode = 403;
            res.end('You are not authorized to perform this operation!');
        }
      
    }).
    put(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
        if(req && req.user && req.user.admin){
            res.send('Put Not Allowed')
        }else{
            res.statusCode = 403;
            res.end('You are not authorized to perform this operation!');
        }
        
    }).
    delete(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
        if(req && req.user && req.user.admin){
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
        }else{
            res.statusCode = 403;
            res.end('You are not authorized to perform this operation!');
        }
     
    });
//handling promotionId
promoRouter.route('/:promotionId')
    .get(authenticate.verifyUser,(req, res, next) => {
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
    post(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {

        if(req && req.user && req.user.admin){
            res.send('Post Not allowed'); 
        }else{
            res.statusCode = 403;
            res.end('You are not authorized to perform this operation!');
        }

       
    }).
    put(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
        if(req && req.user && req.user.admin){
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
        }else{
            res.statusCode = 403;
            res.end('You are not authorized to perform this operation!');
        }

      
    }).
    delete(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
        if(req && req.user && req.user.admin){
            Promotion.findByIdAndRemove(req.params.promotionId)
            .then(result => {
                res.statusCode === 200
                res.setHeader('Content-Type', 'application/json');
                res.json(result)
            }, error => { next(error) }).
            catch(error => {
                next(error)
            })
        }else{
            res.statusCode = 403;
            res.end('You are not authorized to perform this operation!');
        }
      
    });
   

module.exports = promoRouter;
