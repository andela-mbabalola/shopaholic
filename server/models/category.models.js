(function() {
	'use strict';

	var mongoose = require('mongoose'),
		ObjectId = Schema.Types.ObjectId,


		CategorySchema = new Schema({
			name: {
				type: String,
				required: true,
			}

			createdAt: {
        type: Date,
        default: Date.now
      },

      updatedAt: {
        type: Date,
        default: Date.now
      }
		});

		var Category = mongoose.model('Category', CategorieSchema);
		module.exports(Category);
})();