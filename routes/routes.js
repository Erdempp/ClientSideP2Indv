const RestaurantController = require('../controllers/restaurantcontroller');
const MenuItemController = require('../controllers/menuitemcontroller')

module.exports = (app) => {
    //Restaurant endpoints
    app.get('/api/restaurants', RestaurantController.getRestaurants);
    app.get('/api/restaurants/:id', RestaurantController.getRestaurant);
    app.post('/api/restaurants', RestaurantController.createRestaurant);
    app.put('/api/restaurants/:id', RestaurantController.editRestaurant);
    app.delete('/api/restaurants/:id', RestaurantController.deleteRestaurant);

    //Menu item endpoints
    app.get('/api/menuitems', MenuItemController.getMenuItems);
    app.get('/api/menuitems/:id', MenuItemController.getMenuItem);
    app.post('/api/restaurants/:id/menuitems', MenuItemController.createMenuItem);
    app.put('/api/menuitems/:id', MenuItemController.editMenuItem);
    app.delete('/api/menuitems/:id', MenuItemController.deleteMenuItem);
}