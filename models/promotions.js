var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose)
const Currency = mongoose.Types.Currency;


const promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    featured: {
        type: Boolean,
        default:false      
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    }
}, 
{
    timestamps: true
});

var Promotions = mongoose.model('Promotion', promotionSchema);
module.exports = Promotions;