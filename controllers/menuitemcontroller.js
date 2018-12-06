const mongoose = require('mongoose');
const MenuItem = require('../models/menuitem');
const Restaurant = require('../models/restaurant');

module.exports =  {
    getMenuItems(req, res, next) {
        const restaurantId = req.params.id;
        const validObjectId = mongoose.Types.ObjectId.isValid(restaurantId);

        if(validObjectId) {
            Restaurant.findById(restaurantId)
                .then((restaurant) => {
                    if(restaurant !== null) {
                        MenuItem.find({ restaurant: restaurant })
                        .then((menuItems) => {
                            let menuItemArray = [];
                            menuItems.forEach(menuItem => {
                                let menuItemResponse = {
                                    _id: menuItem._id,
                                    name: menuItem.name,
                                    price: menuItem.price,
                                    amount: menuItem.amount,
                                    available: menuItem.available,
                                    restaurant: menuItem.restaurant //Populate?
                                }
                                menuItemArray.push(menuItemResponse);
                            })
                            res.status(200).send(menuItemArray);
                        }).catch(next);
                    } else {
                        res.status(404).send({ Error: 'This restaurant does not exist'});
                    }
                }).catch(next);
        } else {
            res.status(422).send({ Error: 'This restaurant does not exist'});
        }
    },

    getMenuItem(req, res, next) {
        const menuItemId = req.params.id;
        const validObjectId = mongoose.Types.ObjectId.isValid(menuItemId);

        if(validObjectId) {
            MenuItem.findById(menuItemId)
                .then((menuItem) => {
                    if(menuItem !== null) {
                        let menuItemResponse = {
                            _id: menuItem._id,
                            name: menuItem.name,
                            price: menuItem.price,
                            amount: menuItem.amount,
                            available: menuItem.available,
                            restaurant: menuItem.restaurant //Populate?
                        }
                        res.status(200).send(menuItemResponse);
                    } else {
                        res.status(404).send({ Error: 'This menu item does not exist'});
                    }
                }).catch(next);
        } else {
            res.status(422).send({ Error: 'This menu item does not exist'});
        }
    },

    createMenuItem(req, res, next) {
        const restaurantId = req.params.id;
        const menuItemProps = req.body;
        const validObjectId = mongoose.Types.ObjectId.isValid(restaurantId);

        if(validObjectId) {
            if(menuItemProps.name && menuItemProps.price && menuItemProps.amount && menuItemProps.available !== null) {
                Restaurant.findById(restaurantId)
                    .then((restaurant) => {
                        if(restaurant !== null) {
                            MenuItem.findOne({ name: menuItemProps.name, restaurant: restaurant })
                                .then((menuItem) => {
                                    if(menuItem === null) {
                                        MenuItem.create({ name: menuItemProps.name, price: menuItemProps.price, amount: menuItemProps.amount, available: menuItemProps.available, restaurant: restaurant })
                                            .then(() => {
                                                res.status(200).send({ Message: 'Menu item successfully added'})
                                            }).catch(next);
                                    } else {
                                        res.status(409).send({ Error: 'This menu item already exists for this restaurant'});
                                    }
                                }).catch(next);
                        } else {
                            res.status(404).send({ Error: 'This restaurant does not exist'});
                        }
                    }).catch(next);
            } else {
                res.status(422).send({ Error: 'Invalid menu item properties'})
            }
        } else {
            res.status(422).send({ Error: 'This restaurant does not exist'});
        }
    },

    editMenuItem(req, res, next) {
        const menuItemId = req.params.id;
        const menuItemProps = req.body;
        const validObjectId = mongoose.Types.ObjectId.isValid(menuItemId);
    
        if(validObjectId) {
            if(menuItemProps.name && menuItemProps.amount && menuItemProps.available !== null) {
                MenuItem.findOne({ _id: menuItemId })
                .then((menuItem) => {
                    if(menuItem !== null) {
                        MenuItem.findOne({ name: menuItemProps.name, price: menuItemProps.price, amount: menuItemProps.amount, available: menuItemProps.available, restaurant: menuItem.restaurant })
                            .then((menuItemCheck) => {
                                if(menuItemCheck === null) {
                                    MenuItem.findByIdAndUpdate(menuItemId, { name: menuItemProps.name, price: menuItemProps.price, amount: menuItemProps.amount, available: menuItemProps.available })
                                        .then(() => {
                                            res.status(200).send({ Message: 'Successfully updated menu item' })
                                        })
                                } else {
                                    res.status(409).send({ Error: 'This menu item already exists for this restaurant'});
                                }
                            }).catch(next);
                    } else {
                        res.status(404).send({ Error: 'This menu item does not exist'});
                    }
                }).catch(next);
            } else {
                res.status(422).send({ Error: 'Invalid menu item properties'})
            }
        }
    },

    deleteMenuItem(req, res, next) {
        const menuItemId = req.params.id;
        const validObjectId = mongoose.Types.ObjectId.isValid(menuItemId);

        if(validObjectId) {
            MenuItem.findById(menuItemId)
                .then((menuItem) => {
                    if(menuItem !== null) {
                        menuItem.remove()
                            .then(() => {
                                res.status(200).send({ Message: 'Successfully deleted menu item' });
                            }).catch(next)
                    } else {
                        res.status(404).send({ Error: 'This menu item does not exist'});                        
                    }
                }).catch(next);
        } else {
            res.status(422).send({ Error: 'This menu item does not exist'});
        }
    }
};