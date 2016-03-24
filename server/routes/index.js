(function() {
  'Use strict';
  var _userRoute = require('./user.routes'),
    _categoryRoute = require('./category.routes'),
    _reviewRoute = require('./review.routes'),
    _productRoute = require('./product.routes');
  var routes = function(router) {
    _userRoute(router);
    _categoryRoute(router);
    _reviewRoute(router);
    _productRoute(router);
  };
  module.exports = routes;
})();
