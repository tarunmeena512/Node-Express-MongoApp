const express = require('express')
var bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const assert = require('assert');
const Dishes = require('./models/dishes')
const dishRouter = require('./routers/dishRouter')
const promotionRouter = require('./routers/promoRouter')
const leaderRouter = require('./routers/leaderRouter')

const url = 'mongodb://localhost:27017/confusion'
const connect = mongoose.connect(url);

connect.then(db => {
  console.log('DB connected!!');
}, error => {
  console.log('error' + error);
})

const app = express()
const port = 3000

app.use('/dishes', dishRouter);
app.use('/promotions', promotionRouter);
app.use('/leaders', leaderRouter);

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
