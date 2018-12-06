const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuItemSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'restaurant'
    }
});

const MenuItem = mongoose.model('menuitem', MenuItemSchema);

module.exports = MenuItem;