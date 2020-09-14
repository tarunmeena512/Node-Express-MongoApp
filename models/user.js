var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: true
    }
}, 
{
    timestamps: true
});

var Users = mongoose.model('Users', usersSchema);
module.exports = Users;