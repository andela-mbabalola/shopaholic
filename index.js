(function() {
	'use strict';

	var app = require('./config'),
		mongoose = require('mongoose'),
		db = require('config'),

		port = process.env.PORT || 3000;

		mongoose.	connect(db.url);

		app.listen(port);
		console.log('Successfully connected to port ' + port);

		module.exports = app;
})();