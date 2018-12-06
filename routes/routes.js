const RestaurantController = require('../controllers/restaurantcontroller');
const MenuItemController = require('../controllers/menuitemcontroller')
const DelivererController = require('../controllers/deliverercontroller')

module.exports = (app) => {
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

    //Deliverer endpoints
    app.get('/api/restaurants/:id/deliverers', DelivererController.getDeliverers);
    app.get('/api/deliverers/:id', DelivererController.getDeliverer);
    app.post('/api/restaurants/:id/deliverers', DelivererController.createDeliverer);
    app.put('/api/deliverers/:id', DelivererController.editDeliverer);
    app.delete('/api/deliverers/:id', DelivererController.deleteDeliverer);
}