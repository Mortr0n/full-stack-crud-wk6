const FavRestaurant = require("../models/favrestaurant.model");


module.exports = {
	index: (req, res) => {
		res.json({ message: 'Hello World'});
	},

	createFavRestaurant: (req, res) => {
		FavRestaurant.create(req.body)
			.then(newFavRestaurant => {
				res.json(newFavRestaurant);
			})
			.catch((err)=> res.status(400).json(err));
	},

	getAllFavRestaurants: (req, res) => {
		FavRestaurant.find()
			.then(allRestaurants => {
				res.json(allRestaurants)
			})
	}, 
	
	getOneFavRestaurant: (req, res) => {
		FavRestaurant.findOne({ _id: req.params.id })
			.then((foundRestaurant) => res.json(foundRestaurant))
			.catch((err) => res.status(400).json(err));
	},

	updateOneFavRestaurant: (req, res) => {
		FavRestaurant.findByIdAndUpdate( 
			{ _id: req.params.id},
			req.body,
			{ new: true, runValidators: true },
		)
			.then((updatedFavRestaurant) => res.json(updatedFavRestaurant))
			.catch((err) => res.status(400).json(err));
	},

	deleteOneFavRestaurant: (req, res) => {
		FavRestaurant.findByIdAndDelete({ _id: req.params.id })
			.then((deletedRestaurant) => res.json(deletedRestaurant))
			.catch((err) => res.status(400).json(err));
	}

}