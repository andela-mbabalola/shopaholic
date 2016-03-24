(function() {
	'use strict';

	var User = require('./user.models'),
		Review = require('./review.models'),
		Category = require('./category.models'),
		Product = require('./product.models');

		exports.User = User;
		exports.Review = Review;
		exports.Category = Category;
		exports.Product = Product;
})();