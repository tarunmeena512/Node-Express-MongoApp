var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PassportLocalMongoose = require('passport-local-mongoose'); 

const usersSchema = new Schema({
    admin: {
        type: Boolean,
        default: true
    }
});
//this will add support for username and hashed support to password
usersSchema.plugin(PassportLocalMongoose);

var Users = mongoose.model('Users', usersSchema);
module.exports = Users;
