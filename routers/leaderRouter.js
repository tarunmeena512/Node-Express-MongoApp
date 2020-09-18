const express = require('express')
var bodyParser = require('body-parser')
const Leaders = require('../models/leaders')
var authenticate = require('../authenticate');
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .get(authenticate.verifyUser(),(req, res, next) => {
        Leaders.find({}).exec()
        .then(leader => {
            console.log(leader)
            res.statusCode === 200
            res.setHeader('Content-Type', 'application/json');
            res.json(leader)
        }, error => { next(error) }).
        catch(error => {
            next(error)
        })
    }).
    post(authenticate.verifyUser(),(req, res, next) => {
        Leaders.create(req.body)
        .then(leader => {
            console.log('Leader Created');
            res.statusCode === 201
            res.setHeader('Content-Type', 'application/json');
            res.json(leader)
        }, error => { next(error) }).
        catch(error => {
            next(error)
        })
    }).
    put(authenticate.verifyUser(),(req, res, next) => {
        res.send('Put Not Allowed')
    }).
    delete(authenticate.verifyUser(),(req, res, next) => {
        Leaders.remove({})
            .then(result => {
                console.log('Leaders Deleted');
                res.statusCode === 200
                res.setHeader('Content-Type', 'application/json');
                res.json(result)
            }, error => { next(error) }).
            catch(error => {
                next(error)
            })
    });
//handling LeaderID
leaderRouter.route('/:leaderId')
    .get(authenticate.verifyUser(),(req, res, next) => {
        Leaders.findById(req.params.leaderId)
            .then(leader => {
                res.statusCode === 200
                res.setHeader('Content-Type', 'application/json');
                res.json(leader)
            }, error => { next(error) }).
            catch(error => {
                next(error)
            })
    }).
    post(authenticate.verifyUser(),(req, res, next) => {
        res.send('Post Not allowed');
    }).
    put(authenticate.verifyUser(),(req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, { new: true })
            .then(leader => {
                res.statusCode === 200
                res.setHeader('Content-Type', 'application/json');
                res.json(leader)
            }, error => { next(error) }).
            catch(error => {
                next(error)
            })
    }).
    delete(authenticate.verifyUser(),(req, res, next) => {
        Leaders.findByIdAndRemove(req.params.leaderId)
            .then(result => {
                res.statusCode === 200
                res.setHeader('Content-Type', 'application/json');
                res.json(result)
            }, error => { next(error) }).
            catch(error => {
                next(error)
            })
    });

module.exports = leaderRouter;
