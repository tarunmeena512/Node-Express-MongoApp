const express = require('express')
var bodyParser = require('body-parser')
const Leaders = require('../models/leaders')
var authenticate = require('../authenticate');
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .get(authenticate.verifyUser,(req, res, next) => {
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
    post(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
        if(req && req.user && req.user.admin){
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
        }else{
            res.statusCode = 403;
            res.end('You are not authorized to perform this operation!');
        }   
    });
//handling LeaderID
leaderRouter.route('/:leaderId')
    .get(authenticate.verifyUser,(req, res, next) => {
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
        }else{
            res.statusCode = 403;
            res.end('You are not authorized to perform this operation!');
        } 
    }).
    delete(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
        if(req && req.user && req.user.admin){
            Leaders.findByIdAndRemove(req.params.leaderId)
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

module.exports = leaderRouter;
