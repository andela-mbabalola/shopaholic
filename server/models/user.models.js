(function() {
	'use strict';

	var mongoose = require('mongoose'),
		bcrypt = require('bcrypt'),
		SALT_WORK_FACTOR = 10,
		schema = mongoose.schema,
		ObjectId = Schema.Types.ObjectId,

		UserSchema = new Schema({
			firstName: {
				type: String,
				validate: {
					validator: (name)=> {
            return /[a-zA-Z]/.test(name);
          },
          message: '{VALUE} is not a valid name'
				}
			},

			lastName: {
				type: String,
				validate: {
					validator: (name)=> {
						return /[a-zA-Z]/.test(name);
					},
					message: '{VALUE} is not a valid name'
				}
			},

			password: {
				type: String,
				required: true,
      	minLength: 8,
      	validate: {
        	validator: (password)=> {
          	return /\w/.test(password);
        	},
        	message: '{VALUE} is not a valid password!'
      	}
			}

			email: {
	      type: String,
	      required: true,
	      unique: true,
	      validate: {
	        validator: (email)=> {
	          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
	        },
	        message: '{VALUE} is not a valid email!'
	      }
    	},

    	//profile picture
    	imgUrl: {
    		type: String,
    		default: 'img/user.jpeg'
    	},

    	facebookId: {
    		type: String
    	},

    	googleId: {
    		type: String
    	}

    	createdAt: {
	      type: Date,
	      default: Date.now
    	},

    	updatedAt: {
      	type: Date,
      	default: Date.now
    	},
		});

		//Bcrypt middleware on UserSchema
		UserSchema.pre('save', (next)=> {
			var user = this;

			//only hash password if it has been modified(or new)
			if(!user.isModified('password')) {
				return next();
			}

			//generate salt
			bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt)=> {
				if(err) {
					return next(err);
				}

				//hash password using new salt
				bcrypt.hash(user.password, salt, (err, hash)=> {
					if(err) {
						return next(err);
					}

					//override cleartext password with the hashed one
					user.password = hash;
					next();
				});
			});
		});

		UserSchema.methods.comparePassword = (candidatePassword, cb)=> {
			bcrypt.compare(candidatePassword, this.password, (err, isMatch)=> {
				if(err) {
					return cb(err);
				}
				cb(null, isMatch);
			});
		};

		var User = mongoose.model('User', UserSchema);
		module.exports(User);
})();