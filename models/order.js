const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MenuItem = require('../models/menuitem')

const OrderSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    address: {
        type: Number,
        required: true
    },
    orderItems: [MenuItem],
    totalPrice: {
        type: Number,
        required: true
    },
    paid: {
        type: Boolean,
        required: true
    },
    delivered: {
        type: Boolean,
        required: true
    },
    deliverer: {
        type: Schema.Types.ObjectId,
        ref: 'deliverer'        
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'restaurant'
    }
});

// OrderSchema.virtual('totalPrice').get(function() {

// })

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;