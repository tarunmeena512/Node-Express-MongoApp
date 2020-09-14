const express = require('express')
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const dishRouter = require('./routers/dishRouter')
const promotionRouter = require('./routers/promoRouter')
const leaderRouter = require('./routers/leaderRouter');
const usersRouter = require('./routers/users');
const { Buffer } = require('buffer');
const CookieParser = require('cookie-parser');
const Session = require('express-session');
const FileStore = require('session-file-store')(Session);


const url = 'mongodb://127.0.0.1:27017/confusion';
const connect = mongoose.connect(url);

connect.then(db => {
  console.log('DB connected!!');
}, error => {
  console.log('error' + error);
})

const app = express()
const port = 3000

//adding cookie
      //app.use(CookieParser('12345-12345-12345-12345'));
app.use(Session({
  name:"session-id",
  store: new FileStore(),
  resave :false ,
  secret : "12345-12345-12345-12345",
  saveUninitialized : false
}))

app.use('/users', usersRouter);

//Basic auhentication before allow routes
function auth(req, res, next) {

  if (!req.session.user) {
      var error = new Error('Your Are Not Authenticated');
      res.setHeader('WWW-Authenticate', 'Basic')
      res.status = 401;
      return  next(error)
  }
  else if (req.session.user === "authenticate") {
    next();
  } else {
    var error = new Error('Your Are Not Authenticated');
    res.status = 401;
    return next(error)

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
