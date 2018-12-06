const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DelivererSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'restaurant'
    }
});

const Deliverer = mongoose.model('deliverer', DelivererSchema);

module.exports = Deliverer;