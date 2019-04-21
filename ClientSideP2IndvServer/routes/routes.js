const UserController = require('../controllers/usercontroller');
const RestaurantController = require('../controllers/restaurantcontroller');
const MenuItemController = require('../controllers/menuitemcontroller');
const OrderController = require('../controllers/ordercontroller');

module.exports = (app) => {
    //User endpoint
    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.login);
    
    //Restaurant endpoints
    app.get('/api/restaurants', RestaurantController.getRestaurants);
    app.get('/api/restaurants/:id', RestaurantController.getRestaurant);
    app.post('/api/restaurants', RestaurantController.createRestaurant);
    app.put('/api/restaurants/:id', RestaurantController.editRestaurant);
    app.delete('/api/restaurants/:id', RestaurantController.deleteRestaurant);

    //Menu item endpoints
    app.get('/api/restaurants/:id/menuitems', MenuItemController.getMenuItems);
    app.get('/api/menuitems/:id', MenuItemController.getMenuItem);
    app.post('/api/restaurants/:id/menuitems', MenuItemController.createMenuItem);
    app.put('/api/menuitems/:id', MenuItemController.editMenuItem);
    app.delete('/api/menuitems/:id', MenuItemController.deleteMenuItem);

    //Order endpoints
    app.get('/api/restaurants/:id/orders', OrderController.getOrders);
    app.get('/api/orders/:id', OrderController.getOrder);
    app.post('/api/restaurants/:id/orders', OrderController.createOrder);
    app.delete('/api/orders/:id', OrderController.deleteOrder);
}