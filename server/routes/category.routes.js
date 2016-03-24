(function() {
  'Use strict';

  var categoryController = require('./../controllers/category.controllers'),
    auth = require('./../middlewares/auth');

  function categoryRoute(router) {

    //route to create a new category
    router.route('/category')
      .post(auth.authMiddleware, categoryController.createCategory);
      .get(categoryController.getAllCategory);

    //route to get, edit and delete a category specified by its Id
    router.route('/category/:id')
      .get(categoryController.getACategory)
      .put(auth.authMiddleware, categoryController.updateCategory)
      .delete(auth.authMiddleware, categoryController.deleteCategory);

  }
  //exporting all available routes
  module.exports = categoryRoute;

})();
