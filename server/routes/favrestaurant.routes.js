const { application } = require('express');
const favRestaurantController = require('../controllers/favrestaurant.controller');

module.exports = (app) => {
    app.get('/api', favRestaurantController.index);
    app.post('/api/favrestaurant', favRestaurantController.createFavRestaurant);
    app.get('/api/favrestaurant', favRestaurantController.getAllFavRestaurants);
    app.get('/api/favrestaurant/:id', favRestaurantController.getOneFavRestaurant);
    app.put('/api/favrestaurant/:id', favRestaurantController.updateOneFavRestaurant);
    app.delete('/api/favrestaurant/:id', favRestaurantController.deleteOneFavRestaurant);
}
