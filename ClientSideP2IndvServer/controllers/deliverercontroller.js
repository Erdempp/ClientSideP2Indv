const mongoose = require('mongoose');
const Deliverer = require('../models/deliverer');
const Restaurant = require('../models/restaurant');

module.exports =  {
    getDeliverers(req, res, next) {
        const restaurantId = req.params.id;
        const validObjectId = mongoose.Types.ObjectId.isValid(restaurantId);

        if(validObjectId) {
            Restaurant.findById(restaurantId)
                .then((restaurant) => {
                    if(restaurant !== null) {
                        Deliverer.find({ restaurant: restaurant })
                        .then((deliverers) => {
                            let delivererArray = [];
                            deliverers.forEach(deliverer => {
                                let delivererResponse = {
                                    _id: deliverer._id,
                                    name: deliverer.name,
                                    age: deliverer.age,
                                    sex: deliverer.sex
                                }
                                delivererArray.push(delivererResponse);
                            })
                            res.status(200).send(delivererArray);
                        }).catch(next);
                    } else {
                        res.status(404).send({ Error: 'This restaurant does not exist'});
                    }
                }).catch(next);
        } else {
            res.status(422).send({ Error: 'This restaurant does not exist'});
        }
    },

    getDeliverer(req, res, next) {
        const delivererId = req.params.id;
        const validObjectId = mongoose.Types.ObjectId.isValid(delivererId);

        if(validObjectId) {
            Deliverer.findById(delivererId)
                .then((deliverer) => {
                    if(deliverer !== null) {
                        let delivererResponse = {
                            _id: deliverer._id,
                            name: deliverer.name,
                            age: deliverer.age,
                            sex: deliverer.sex
                        }
                        res.status(200).send(delivererResponse);
                    } else {
                        res.status(404).send({ Error: 'This deliverer does not exist'});
                    }
                }).catch(next);
        } else {
            res.status(422).send({ Error: 'This deliverer does not exist'});
        }
    },

    createDeliverer(req, res, next) {
        const restaurantId = req.params.id;
        const delivererProps = req.body;
        const validObjectId = mongoose.Types.ObjectId.isValid(restaurantId);

        if(validObjectId) {
            if(delivererProps.name && delivererProps.age && delivererProps.sex) {
                Restaurant.findById(restaurantId)
                    .then((restaurant) => {
                        if(restaurant !== null) {
                            Deliverer.create({ name: delivererProps.name, age: delivererProps.age, sex: delivererProps.sex, restaurant: restaurant })
                                .then(() => {
                                    res.status(200).send({ Message: 'Deliverer successfully added'})
                                }).catch(next);
                        } else {
                            res.status(404).send({ Error: 'This restaurant does not exist'});
                        }
                    }).catch(next);
            } else {
                res.status(422).send({ Error: 'Invalid deliverer properties'})
            }
        } else {
            res.status(422).send({ Error: 'This restaurant does not exist'});
        }
    },

    editDeliverer(req, res, next) {
        const delivererId = req.params.id;
        const delivererProps = req.body;
        const validObjectId = mongoose.Types.ObjectId.isValid(delivererId);
    
        if(validObjectId) {
            if(delivererProps.name && delivererProps.age && delivererProps.sex) {
                Deliverer.findOne({ _id: delivererId })
                .then((deliverer) => {
                    if(deliverer !== null) {
                        Deliverer.findByIdAndUpdate(delivererId, { name: delivererProps.name, age: delivererProps.age, sex: delivererProps.sex })
                            .then(() => {
                                res.status(200).send({ Message: 'Successfully updated deliverer' })
                            })
                    } else {
                        res.status(404).send({ Error: 'This deliverer does not exist'});
                    }
                }).catch(next);
            } else {
                res.status(422).send({ Error: 'Invalid deliverer properties'})
            }
        }
    },

    deleteDeliverer(req, res, next) {
        const delivererId = req.params.id;
        const validObjectId = mongoose.Types.ObjectId.isValid(delivererId);

        if(validObjectId) {
            Deliverer.findById(delivererId)
                .then((deliverer) => {
                    if(deliverer !== null) {
                        deliverer.remove()
                            .then(() => {
                                res.status(200).send({ Message: 'Successfully deleted deliverer' });
                            }).catch(next)
                    } else {
                        res.status(404).send({ Error: 'This deliverer does not exist'});                        
                    }
                }).catch(next);
        } else {
            res.status(422).send({ Error: 'This deliverer does not exist'});
        }
    }
};