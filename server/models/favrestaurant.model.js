const mongoose = require('mongoose');

const FavRestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Restaurant must have a name"],
        minlength: [2, "Restaurant name must be at least 2 characters long"],
        maxlength: [200, "Restaurant name must be less than 200 characters"],
    },
    cuisineType: {
        type: String,
        required: [true, "Must select a cuisine type"],
        enum: {values:["Mexican", "American", "Chinese"], message: "You must pick Mexican American or Chinese" }, 
    },
    delivery: {
        type: Boolean,
        default: false,
    },
    dishImgUrl: {
        type: String,
        required: [true, "Dish image URL must be added"],
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    }
});

const FavRestaurant = mongoose.model("FavRestaurant", FavRestaurantSchema);

module.exports = FavRestaurant;