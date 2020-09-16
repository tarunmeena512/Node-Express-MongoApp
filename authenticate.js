//store local auth strategy
var Passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User  = require('./models/user');

passport.use(new LocalStrategy(User.authenticate()));
Passport.serializeUser(User.serializeUser())
Passport.deserializeUser(User.deserializeUser())
