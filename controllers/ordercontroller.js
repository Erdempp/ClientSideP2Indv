const mongoose = require('mongoose');
const Order = require('../models/order');
const Restaurant = require('../models/restaurant');

module.exports =  {
    getOrders(req, res, next) {
        const restaurantId = req.params.id;
        const validObjectId = mongoose.Types.ObjectId.isValid(restaurantId);

        if(validObjectId) {
            Restaurant.findById(restaurantId)
                .then((restaurant) => {
                    if(restaurant !== null) {
                        Order.find({ restaurant: restaurant })
                        .then((orders) => {
                            let orderArray = [];
                            orders.forEach(order => {
                                let orderResponse = {
                                    _id: order._id,
                                    name: order.name,
                                    address: order.address,
                                    orderItems: order.orderItems,
                                    totalPrice: order.totalPrice,
                                    paid: order.paid,
                                    delivered: order.delivered,
                                    deliverer: order.deliverer, //Populate?
                                    restaurant: order.restaurant //Populate?
                                }
                                orderArray.push(orderResponse);
                            })
                            res.status(200).send(orderArray);
                        }).catch(next);
                    } else {
                        res.status(404).send({ Error: 'This restaurant does not exist'});
                    }
                }).catch(next);
        } else {
            res.status(422).send({ Error: 'This restaurant does not exist'});
        }
    },

    getOrder(req, res, next) {
        const orderId = req.params.id;
        const validObjectId = mongoose.Types.ObjectId.isValid(orderId);

        if(validObjectId) {
            Order.findById(orderId)
                .then((order) => {
                    if(order !== null) {
                        let orderResponse = {
                            _id: order._id,
                            name: order.name,
                            address: order.address,
                            orderItems: order.orderItems,
                            totalPrice: order.totalPrice,
                            paid: order.paid,
                            delivered: order.delivered,
                            deliverer: order.deliverer, //Populate?
                            restaurant: order.restaurant //Populate?
                        }
                        res.status(200).send(orderResponse);
                    } else {
                        res.status(404).send({ Error: 'This order does not exist'});
                    }
                }).catch(next);
        } else {
            res.status(422).send({ Error: 'This order does not exist'});
        }
    },

    createOrder(req, res, next) {
        const restaurantId = req.params.id;
        const orderProps = req.body;
        const validObjectId = mongoose.Types.ObjectId.isValid(restaurantId);

        if(validObjectId) {
            if(orderProps.name && orderProps.address && orderProps.orderItems && orderProps.totalPrice && orderProps.paid && orderProps.delivered && orderProps.deliverer && orderProps.restaurant) {
                Restaurant.findById(restaurantId)
                    .then((restaurant) => {
                        if(restaurant !== null) {
                            Order.create({ name: orderProps.name, address: orderProps.address, orderItems: orderProps.orderItems, totalPrice: orderProps.totalPrice, paid: orderProps.paid, delivered: orderProps.delivered, deliverer: orderProps.deliverer, restaurant: orderProps.restaurant })
                                .then(() => {
                                    res.status(200).send({ Message: 'Order successfully added'})
                                }).catch(next);
                        } else {
                            res.status(404).send({ Error: 'This restaurant does not exist'});
                        }
                    }).catch(next);
            } else {
                res.status(422).send({ Error: 'Invalid order properties'})
            }
        } else {
            res.status(422).send({ Error: 'This restaurant does not exist'});
        }
    },

    deleteOrder(req, res, next) {
        const orderId = req.params.id;
        const validObjectId = mongoose.Types.ObjectId.isValid(orderId);

        if(validObjectId) {
            Order.findById(orderId)
                .then((order) => {
                    if(order !== null) {
                        order.remove()
                            .then(() => {
                                res.status(200).send({ Message: 'Successfully deleted order' });
                            }).catch(next)
                    } else {
                        res.status(404).send({ Error: 'This order does not exist'});                        
                    }
                }).catch(next);
        } else {
            res.status(422).send({ Error: 'This order does not exist'});
        }
    }
};