const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MenuItem = require('../models/menuitem');

const OrderSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: Number,
        required: true
    },
    orderItems: [{
        type: Schema.Types.ObjectId,
        ref: 'menuitem'
    }],
    // totalPrice: {
    //     type: Number,
    //     required: true
    // },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'restaurant'
    }
});

// OrderSchema.virtual('totalPrice').get(function() {

// })

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;