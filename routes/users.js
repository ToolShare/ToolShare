var users = module.exports;
var User = require('../models/User');

users.index = function(req, res){
  res.send('users index');
};

users.new = function(req, res){
  res.send('new users');
};

users.create = function(req, res) {
	console.log("Got new user");
	console.log(req.body);
	var user = new User();

	user.username = req.body.username;
	user.password = req.body.password;
	user.address = req.body.address;

	// user.save(function(err) {
	// 		if (err) {
	// 	 		res.send(err);
	// 		} else {
	// 	 		var message = team.name + ' added to DB';
	// 			res.json({message: message});
	// 		}
	// 	});
		
  res.json(user);

};

users.show = function(req, res){
  res.send('show users ' + req.params.users);
};

users.edit = function(req, res){
  res.send('edit users ' + req.params.users);
};

users.update = function(req, res){
  res.send('update users ' + req.params.users);
};

users.destroy = function(req, res){
  res.send('destroy users ' + req.params.users);
};