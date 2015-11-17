var tools = module.exports;

tools.index = function(req, res){
  res.send('tools index');
};

tools.new = function(req, res){
  res.send('new tools');
};

tools.create = function(req, res){
  res.send('create tools');
};

tools.show = function(req, res){
  res.send('show tools ' + req.params.tools);
};

tools.edit = function(req, res){
  res.send('edit tools ' + req.params.tools);
};

tools.update = function(req, res){
  res.send('update tools ' + req.params.tools);
};

tools.destroy = function(req, res){
  res.send('destroy tools ' + req.params.tools);
};

