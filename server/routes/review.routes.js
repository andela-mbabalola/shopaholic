(function() {
  'Use strict';

  var reviewController = require('./../controllers/review.controllers'),
    auth = require('./../middlewares/auth');

  function reviewRoute(router) {

    //route to create a new review
    router.route('/review')
      .post(auth.authMiddleware, reviewController.createReview);
      .get(reviewController.getAllReview);

    //route to get, edit and delete a review specified by its Id
    router.route('/review/:id')
      .get(reviewController.getAReview)
      .put(auth.authMiddleware, reviewController.updateReview)
      .delete(auth.authMiddleware, reviewController.deleteReview);

  }
  //exporting all available routes
  module.exports = reviewRoute;

})();
