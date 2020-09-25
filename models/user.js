var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PassportLocalMongoose = require('passport-local-mongoose'); 

const usersSchema = new Schema({
    firstname: {
        type: String,
          default: ''
      },
      lastname: {
        type: String,
          default: ''
      },
      admin:   {
          type: Boolean,
          default: false
      }
});
//this will add support for username and hashed support to password
usersSchema.plugin(PassportLocalMongoose);

var Users = mongoose.model('Users', usersSchema);
module.exports = Users;
