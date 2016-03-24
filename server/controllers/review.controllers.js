(function() {
  'use strict';

  var Review = require('./../models/review.models'),
    Product = require('./../models/product.models');

  exports.createReview = (req, res) => {
    Product.findOne({
      _id: req.params.id
    }, (err, user) => {
      if (err) {
        res.send(err);
      } else if (!user) {
        res.status(404).json({
          error: 'User not found'
        })
      } else {
        Review.findOne({
          _id: req.params.id
        }, (err, review) => {
          if (err) {
            res.send(err);
          } else if (review) {
            res.status(409).json({
              error: 'Review exists'
            })
          } else {
            var newReview = new Review({
              review: req.body.review,
              reviewTitle: req.body.reviewTitle,
              rating: req.body.rating,
              prodId: req.body.prodId
            });
            Review.save(newReview, (err, review) => {
              if (err) {
                res.send(err);
              } else {
                res.json({
                  message: 'Review created'
                });
              }
            });
          }
        });
      }
    })
  };

  exports.getAllReview = (req, res) => {
    Review.find({}).exec((err, review) => {
      if (err) {
        res.send(err);
      } else {
        res.json(review);
      }
    });
  };

  exports.getAReview = (req, res) => {
    Review.findById(req.params.id, (err, review) => {
      if (err) {
        res.send(err);
      } else if (!review) {
        res.status(404).json({
          error: 'Review does not exist'
        })
      } else {
        res.json(review);
      }
    });
  };

    exports.updateReview = (req, res) => {
    Review.findByIdAndUpdate(
      req.params.id, req.body,
      (err, user) => {
        if (err) {
          res.send(err);
          //if product is not found
        } else if (!review) {
          res.status(404).json({
            error: 'review does not exist'
          });
        } else {
          res.json({
            message: 'review Successfully updated!'
          });
        }
      });
  }


  exports.deleteReview = (req, res) => {
    Review.findByIdAndRemove(req.params.id, (err, Review) => {
      if (err) {
        res.send(err);
      } else if (!review) {
        res.status(404).json({
          error: 'Review not found'
        })
      } else {
        res.json({
          message: 'Review deleted'
        });
      }
    });
  };
})();
