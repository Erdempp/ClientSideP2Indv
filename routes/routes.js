const RestaurantController = require('../controllers/restaurantcontroller');

module.exports = (app) => {
    //Restaurant endpoints
    app.get('/api/restaurants', RestaurantController.getRestaurants);
    app.get('/api/restaurants/:id', RestaurantController.getRestaurant);
    app.post('/api/restaurants', RestaurantController.createRestaurant);
    app.put('/api/restaurants/:id', RestaurantController.editRestaurant);
    app.delete('/api/restaurants/:id', RestaurantController.deleteRestaurant);
}