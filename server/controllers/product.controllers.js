(function() {
  'use strict';

  var Product = require('./../models/product.models'),
    jwt = require('jsonwebtoken'),
    Category = require('./../models/category.models');

  exports.createProduct = (req, res) => {
    Category.findOne({
      _id: req.params.id
    }, (err, category) => {
      if (err) {
        res.send(err);
      } else if (category) {
        Product.findOne({
          _id: req.params.id
        }, (err, product) => {
          if (err) {
            res.send(err);
          } else if (product) {
            res.status(409).json({
              error: 'User exists'
            })
          } else {
            var newProduct = {
              name: req.body.name,
              description: req.body.description,
              catId: req.body.catId
            }
            newProduct.save((err, product) => {
              if (err) {
                res.send(err);
              } else {
                res.json({
                  message: Product Created;
                });
              }
            })
          }
        })
      }
    });
  }

  exports.getAProduct = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
      if (err) {
        res.send(err);
      } else if (!product) {
        res.status(404).json({
          error: 'product does not exist'
        });
      } else {
        res.json(product);
      }
    });
  }

  exports.getAllProducts = (req, res) => {
    Product.find({}).exec((err, products) => {
      if (err) {
        res.send(err);
      } else {
        res.json(products);
      }
    })
  }

  exports.updateProduct = (req, res) => {
    Product.findByIdAndUpdate(
      req.params.id, req.body,
      (err, user) => {
        if (err) {
          res.send(err);
          //if product is not found
        } else if (!product) {
          res.status(404).json({
            error: 'product does not exist'
          });
        } else {
          res.json({
            message: 'product Successfully updated!'
          });
        }
      });
  }

  exports.deleteProduct = (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, product) => {
      if (err) {
        res.send(err);
      } else if (!product) {
        res.status(404).json({
          error: 'Product does not exist'
        })
      } else {
        res.json({
          message: 'Product deleted'
        });
      }
    });
  }
})();
