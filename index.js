const express = require('express')
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const dishRouter = require('./routers/dishRouter')
const promotionRouter = require('./routers/promoRouter')
const leaderRouter = require('./routers/leaderRouter');
const userRouter = require('./routers/users');
const uploadRouter = require('./routes/uploadRouter');
const Session = require('express-session');
const FileStore = require('session-file-store')(Session);
var Passport = require('passport');
var config = require('./config');

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then(db => {
  console.log('DB connected!!');
}, error => {
  console.log('error');
})

const app = express()
const port = 3000

app.use(Passport.initialize());

app.use('/users', userRouter);
app.use('/imageUpload',uploadRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promotionRouter);
app.use('/leaders', leaderRouter);

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
