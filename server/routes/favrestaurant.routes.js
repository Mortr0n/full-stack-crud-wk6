const { application } = require('express');
const favRestaurantController = require('../controllers/favrestaurant.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api', favRestaurantController.index);
    app.post('/api/favrestaurant', authenticate, favRestaurantController.createFavRestaurant);
    app.get('/api/favrestaurant', favRestaurantController.getAllFavRestaurants);
    app.get('/api/favrestaurant/:id', favRestaurantController.getOneFavRestaurant);
    app.put('/api/favrestaurant/:id', authenticate, favRestaurantController.updateOneFavRestaurant);
    app.delete('/api/favrestaurant/:id', authenticate, favRestaurantController.deleteOneFavRestaurant);
}
