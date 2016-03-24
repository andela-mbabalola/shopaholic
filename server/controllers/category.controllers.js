(function() {
  'use strict';

  var Category = require('./../models/category.models');

  exports.createCategory = (req, res) => {
    Category.findOne({
      _id: req.body.id
    }, (err, category) => {
      if (err) {
        res.send(err);
      } else if (category) {
        res.status(409).json({
          error: 'Category exists'
        })
      } else {
        var newCat = new Category({
          title: req.body.title
        })

        Category.save(newCat, (err, category) => {
          if (err) {
            res.send(err);
          } else {
            res.json(category);
          }
        });
      }
    });
  };

  exports.getAllCategory = (req, res) => {
    Category.find({}).exec((err, category) => {
      if (err) {
        res.send(err);
      } else {
        res.json(category);
      }
    });
  };

  exports.getACategory = (req, res) => {
    Category.findById(req.params.id, (err, category) => {
      if (err) {
        res.send(err);
      } else if (!category) {
        res.status(404).json({
          error: 'Category does not exist'
        })
      } else {
        res.json(category);
      }
    });
  };

  exports.updateCategory = (req, res) => {
    Category.findByIdAndUpdate(
      req.params.id, req.body,
      (err, user) => {
        if (err) {
          res.send(err);
          //if product is not found
        } else if (!category) {
          res.status(404).json({
            error: 'category does not exist'
          });
        } else {
          res.json({
            message: 'category Successfully updated!'
          });
        }
      });
  }

  exports.deleteCategory = (req, res) => {
    Category.findByIdAndRemove(req.params.id, (err, category) => {
      if (err) {
        res.send(err);
      } else if (!category) {
        res.status(404).json({
          error: 'Category not found'
        })
      } else {
        res.json({
          message: 'Category deleted'
        });
      }
    });
  };
})();
