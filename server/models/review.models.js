(function() {
	'use strict';

	var mongoose = require('mongoose'),
	  ObjectId = Schema.Types.ObjectId,
    
    ReviewSchema = new Schema({
      review: {
        type: String,
        required: true,
        validate: {
          validator: (name)=> {
            return /[a-zA-Z]/.test(name);
          },
          message: '{VALUE} is not a valid name'
        }
      },

      reviewTitle: {
        type: String,
        required: true,
        validate: {
          validator: (name)=> {
            return /[a-zA-Z]/.test(name);
          },
          message: '{VALUE} is not a valid name'
        }
      },

      rating: {
        type: Number,
        required: true,
        default: 0
      }

      prodId: {
        type: ObjectId,
        ref: 'Product'
      },

      createdAt: {
        type: Date,
        default: Date.now
      },

      updatedAt: {
        type: Date,
        default: Date.now
      },
		});

    var Review = mongoose.model('Review', ReviewSchema);
    module.exports(Review);
})();