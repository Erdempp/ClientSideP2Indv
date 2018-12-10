const mongoose = require('mongoose');
const Restaurant = require('../models/restaurant');

module.exports =  {
    getRestaurants(req, res, next) {
        Restaurant.find()
            .then((restaurants) => {
                let restaurantArray = [];
                restaurants.forEach(restaurant => {
                    let restaurantResponse = {
                        _id: restaurant._id,
                        name: restaurant.name,
                        address: restaurant.address,
                        menuitems: restaurant.menuitems,
                        deliverers: restaurant.deliverers
                    }
                    restaurantArray.push(restaurantResponse);
                })
                res.status(200).send(restaurantArray);
            }).catch(next);
    },

    getRestaurant(req, res, next) {
        const restaurantId = req.params.id;
        const validObjectId = mongoose.Types.ObjectId.isValid(restaurantId);

        if(validObjectId) {
            Restaurant.findById(restaurantId)
                .then((restaurant) => {
                    if(restaurant !== null) {
                        let restaurantResponse = {
                            _id: restaurant._id,
                            name: restaurant.name,
                            address: restaurant.address,
                            menuitems: restaurant.menuitems,
                            deliverers: restaurant.deliverers
                        }
                        res.status(200).send(restaurantResponse);
                    } else {
                        res.status(404).send({ Error: 'This restaurant does not exist'});
                    }
                }).catch(next);
        } else {
            res.status(422).send({ Error: 'This restaurant does not exist'});
        }
    },

    createRestaurant(req, res, next) {
        const restaurantProps = req.body;

        if(restaurantProps.name && restaurantProps.address) {
            Restaurant.findOne({ name: restaurantProps.name })
            .then((restaurant) => {
                if(restaurant == null) {
                    Restaurant.create(restaurantProps)
                        .then(() => {
                            res.status(200).send({ Message: 'Restaurant successfully created'});
                        }).catch(next);
                } else {
                    res.status(409).send({ Error: 'A restaurant with this name already exists'})
                }
            }).catch(next);
        } else {
            res.status(422).send({ Error: 'Invalid restaurant properties'})
        }   
    },

    editRestaurant(req, res, next) {
        const restaurantId = req.params.id;
        const restaurantProps = req.body
        const validObjectId = mongoose.Types.ObjectId.isValid(restaurantId);

        if(validObjectId) {
            if(restaurantProps.name && restaurantProps.address) {
                Restaurant.findById(restaurantId)
                    .then((restaurant) => {
                        if(restaurant !== null) {
                            Restaurant.findByIdAndUpdate(restaurantId, { name: restaurantProps.name, address: restaurantProps.address})
                                .then(() => {
                                    res.status(200).send({ Message: 'Successfully updated restaurant'});
                                }).catch(next)
                        } else {
                            res.status(404).send({ Error: 'This restaurant does not exist'});
                        }
                    }).catch(next);
            } else {
                res.status(422).send({ Error: 'Invalid restaurant properties'})
            }
        } else {
            res.status(422).send({ Error: 'This restaurant does not exist'});
        }
    },

    deleteRestaurant(req, res, next) {
        const restaurantId = req.params.id;
        const validObjectId = mongoose.Types.ObjectId.isValid(restaurantId);

        if(validObjectId) {
            Restaurant.findById(restaurantId)
                .then((restaurant) => {
                    if(restaurant !== null) {
                        restaurant.remove()
                            .then(() => {
                                res.status(200).send({ Message: 'Successfully deleted restaurant' });
                            }).catch(next)
                    } else {
                        res.status(404).send({ Error: 'This restaurant does not exist'});                        
                    }
                }).catch(next);
        } else {
            res.status(422).send({ Error: 'This restaurant does not exist'});
        }
    }
};