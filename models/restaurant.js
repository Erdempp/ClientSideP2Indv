const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

// ThreadSchema.pre('remove', function(next) {
//     console.log('pre')
//     const ThreadComment = mongoose.model('comment');
//     ThreadComment.remove({ _id : { $in : this.comments }})
//         .then(() => next());
// });

// ThreadSchema.set('toObject', { getters: true });

const Restaurant = mongoose.model('restaurant', RestaurantSchema);

module.exports = Restaurant;