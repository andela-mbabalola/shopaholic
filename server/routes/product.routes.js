(function() {
  'Use strict';

  var productController = require('./../controllers/product.controllers'),
    auth = require('./../middlewares/auth');

  function productRoute(router) {

    //route to create a new product
    router.route('/product')
      .post(auth.authMiddleware, productController.createProduct);
      .get(productController.getAllProducts);

    //route to get, edit and delete a product specified by its Id
    router.route('/product/:id')
      .get(productController.getAProduct)
      .put(auth.authMiddleware, productController.updateProduct)
      .delete(auth.authMiddleware, productController.deleteProduct);

  }
  //exporting all available routes
  module.exports = categoryRoute;

})();
