const express = require('express')
var bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const assert = require('assert');
const Dishes = require('./models/dishes')
const dishRouter = require('./routers/dishRouter')
const promotionRouter = require('./routers/promoRouter')
const leaderRouter = require('./routers/leaderRouter');
const { Buffer } = require('buffer');

const url = 'mongodb://127.0.0.1:27017/confusion';
const connect = mongoose.connect(url);

connect.then(db => {
  console.log('DB connected!!');
}, error => {
  console.log('error' + error);
})

const app = express()
const port = 3000

//Basic auhentication before allow routes
function auth(req, res, next) {
  console.log(req.headers);
  var authHeaders = req.headers.authorization;
  if (!authHeaders) {
    var error = new Error('Your Are Not Authenticated');
    res.setHeader('WWW-Authenticate', 'Basic')
    res.status = 401;
    next(error)
    return;
  }
  var auth = new Buffer.from(authHeaders.split(' ')[1], 'base64').toString().split(':');
  var user = auth[0];
  var pass = auth[1];
  if (user === 'admin' && pass === 'admin') {
    next() //authorized
  } else {
    var error = new Error('Your Are Not Authenticated');
    res.setHeader('WWW-Authenticate', 'Basic')
    res.status = 401;
    next(error);
  }
}
app.use(auth);
//Basic auhentication before allow routes

app.use('/dishes', dishRouter);
app.use('/promotions', promotionRouter);
app.use('/leaders', leaderRouter);

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
