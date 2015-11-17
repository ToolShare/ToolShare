var users = module.exports;
var User = require('../models/User');

users.index = function(req, res){
	User.find(function(err, users) {
		if (err) {
			return next(err);
		} else {
			res.json(users);
		}
	});
};

users.new = function(req, res){
  res.send('new users');
};

users.create = function(req, res, next) {
	console.log(req.body);
	var user = new User();

	user.username = req.body.username;
	user.password = req.body.password;
	user.address = req.body.address;

	user.save(function(err) {
		if (err) {
	 		return next(err);
		} else {
  		//res.render('../views/index.jade', user);
  		res.json(user);
		}
	});
		

};

users.show = function(req, res, next){
	User.findById(req.params.user, function(err, user) {
		if (err) {
			return next(err);
		} else {
			res.json(user);
		}
	});
};

users.edit = function(req, res){
  res.send('edit users ' + req.params.users);
};

users.update = function(req, res, next){
	User.findById(req.params.user, function(err, user) {
		if (err) {
			return next(err);
		} else {
			console.log(req.body);
			for (var prop in req.body) {
				user[prop] = req.body[prop];
			}
			user.save(function(err) {
				if (err) {
	 				return next(err);
				} else {
  				//res.render('../views/index.jade', user);
  				res.json(user);
				}
			});
		}
	});
};

users.destroy = function(req, res){
	User.remove({_id: req.params.user}, function(err, user) {
		if (err) {
			return next(err);
		} else {
			var message = 'ID: ' + req.params.user + ' deleted from DB';
			res.json({message: message});
		}
	});
};