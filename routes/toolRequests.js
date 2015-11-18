var toolRequests = module.exports;
var ToolRequest = require('../models/ToolRequest');

toolRequests.index = function(req, res) {
  res.redirect('/');
};

toolRequests.new = function(req, res) {
  res.send('new toolRequests');
};

toolRequests.create = function(req, res) {

  var toolRequest = new ToolRequest();

  toolRequest.lenderId = req.body.lenderId;

  if (req.user) { // Session id is present
    toolRequest.requesterId = req.user.id;
  } else { //Assume mocha test
    toolRequest.requesterId = req.body.requesterId;
  }

  toolRequest.toolId = req.body.toolId;
  toolRequest.status = 'open';

  toolRequest.save(function(err) {
    if (err) {
      return next(err);
    } else {
      //res.render('../views/index.jade', user);
      res.json(toolRequest);
    }
  });
};

toolRequests.show = function(req, res) {
  res.send('show toolRequests ' + req.params.toolRequests);
};

toolRequests.edit = function(req, res) {
  res.send('edit toolRequests ' + req.params.toolRequests);
};

toolRequests.update = function(req, res) {
  res.send('update toolRequests ' + req.params.toolRequests);
};

toolRequests.destroy = function(req, res) {
  res.send('destroy toolRequests ' + req.params.toolRequests);
};
