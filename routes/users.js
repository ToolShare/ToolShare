var users = module.exports;

users.index = function(req, res){
  res.send('users index');
};

users.new = function(req, res){
  res.send('new users');
};

users.create = function(req, res){
  res.send('create users');
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