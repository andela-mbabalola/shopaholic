(function() {
  'Use strict';

  var config = require('./../config/config'),
    jwt = require('jsonwebtoken');

  /**
   * [function to generate a token]
   * @param  {[http request object]} req [used to get the request query]
   * @param  {[http response object]} res [used to respond back to client ]
   * @param  {Function} next [pass control to the next handler]
   * @return {[json]}     [success message that token has been created]
   */
  exports.authMiddleware = function(req, res, next) {
    //check header, url parameters or post parameters for token
    var token = req.body.token ||
      req.query.token || req.headers['x-access-token'];
    //decoding token
    if (token) {
      //verify secret and check exp
      jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
          return res.status(403).json({
            message: 'Failed to authenticate token'
          });
        } else {
          //if everything is good
          req.decoded = decoded;
          next();
        }
      });
    } else {
      //if no token is found
      return res.status(401).send({
        message: 'No token provided'
      });
    }
  };
})();
