(function() {
  'use strict';

  var mongoose = require('mongoose'),
    ObjectId = Schema.Types.ObjectId,

    productSchema = new Schema({
      name: {
        type: String,
        required: true,
        validate: {
          validator: (name) => {
            return /[a-zA-Z]/.test(name);
          },
          message: '{VALUE} is not a valid name'
        }
      },
      description: {
        type: String,
        required: true,
        validate: {
          validator: (name) => {
            return /[a-zA-Z]/.test(name);
          },
          message: '{VALUE} is not a valid name'
        }
      },

      catId: {
        type: ObjectId,
        ref: 'Category'
      },

      createdAt: {
        type: Date,
        default: Date.now
      },

      updatedAt: {
        type: Date,
        default: Date.now
      }
    });

    var Product = mongoose.model('Product', productSchema);
    module.exports(Product);
})();
