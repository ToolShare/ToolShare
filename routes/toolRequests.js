var toolRequests = module.exports;

toolRequests.index = function(req, res){
  res.redirect('/');
};

toolRequests.new = function(req, res){
  res.send('new toolRequests');
};

toolRequests.create = function(req, res){
  res.send('create toolRequests');
};

toolRequests.show = function(req, res){
  res.send('show toolRequests ' + req.params.toolRequests);
};

toolRequests.edit = function(req, res){
  res.send('edit toolRequests ' + req.params.toolRequests);
};

toolRequests.update = function(req, res){
  res.send('update toolRequests ' + req.params.toolRequests);
};

toolRequests.destroy = function(req, res){
  res.send('destroy toolRequests ' + req.params.toolRequests);
};
