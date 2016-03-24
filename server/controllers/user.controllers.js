(function() {
	'use strict';

	var User = require('./../models/user.models'),
		jwt = require('jsonwebtoken'),
		helper = require('./../helper/helper');

	exports.createUser = (req, res)=> {
		User.findOne({
			_id: req.params.id
		}, (err, user)=> {
			if(err) {
				res.send(err);
			} else if(user) {
				res.status(409).json({
					error: 'User exists'
				})
			} else {
				var newUser = new User ({
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email
				});
				newUser.save((err, user)=> {
					if(err) {
						res.send(err);
					} else {
						var token = jwt.sign(newUser, config.secret, {
							expiresInMinutes: 1440
						});

						res.json({
							message: 'User created',
							token: token,
							user: user
						});
					}
				});
			}
		});
	};

	exports.getAllUser = (res, req)=> {
		User.find({}).exec((err, users)=> {
			if(err) {
				res.send(err);
			} else {
				res.json(users);
			}
		})
	};

	exports.getAUser = (req, res)=> {
		User.findById(req.params.id, (err, user)=> {
			if(err) {
				res.send(err);
			} else if(!user) {
				res.status(404).json({
					error: 'User does not exist'
				});
			} else {
				res.json(user);
			}
		});
	};

	exports.updateUser = (req, res)=> {
		if(req.body.password === null) {
			delete req.body.password
		} else {
			// generate a salt
      bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt)=> {
        if (err) {
           res.send(err);
        }

        // hash the password using our new salt
        bcrypt.hash(req.body.password, salt, (err, hash)=> {
          if (err) {
            res.send(err);
          }
          // override the cleartext password with the hashed one
          req.body.password = hash;
          //find user and update its details
          User.findByIdAndUpdate(
            req.params.id, req.body,
            (err, user)=> {
              if (err) {
                res.send(err);
                //if user is not found
              } else if (!user) {
                res.status(404).json({
                  error: 'User does not exist'
                });
              } else {
                res.json({
                  message: 'User Successfully updated!'
                });
              }
           });
        });
      });
		}
	};

	exports.deleteUser = (req, res)=> {
		User.findByIdAndRemove(req.params.id, (err, user)=> {
			if(err) {
				res.send(err);
			} else if(!user) {
				res.status(404).json({
					error: 'User does not exist'
				})
			} else {
				res.json({
					message: 'User deleted'
				});
			}
		});
	};
})();