var tools = module.exports;
var Tool = require('../models/Tool');
var User = require('../models/User');

tools.index = function(req, res, next) {
  Tool.find(function(err, tools) {
    if (err) {
      return next(err);
    } else {
      res.json(tools);
    }
  });
};

tools.new = function(req, res) {
  res.render('addtool');
};

tools.create = function(req, res, next) {
  var tool = new Tool();

  if (req.user) { // Session id is present
    tool.userId = req.user.id;
  } else { //Assume mocha test
    tool.userId = req.body.userId;
  }

  tool.category = req.body.category;
  tool.name = req.body.name;
  tool.description = req.body.description;
  tool.isAvailable = true;

  //add
  tool.save(function(err) {
    if (err) {
      return next(err);
    } else {
      //res.render('../views/index.jade', tool);
      //res.json(tool);
      res.redirect('/dashboard');
    }
  });
};

tools.show = function(req, res, next) {
  Tool.findById(req.params.tool, function(err, tool) {
    if (err) {
      return next(err);
    } else {
      //res.json(tool);
      res.render('tooldetail', {tool: tool});
    }
  });
};

tools.edit = function(req, res) {
  res.send('edit tools ' + req.params.tools);
};

tools.update = function(req, res, next) {
  Tool.findById(req.params.tool, function(err, tool) {
    if (err) {
      return next(err);
    } else {
      for (var prop in req.body) {
        if (prop in tool) {
          tool[prop] = req.body[prop];
        }
      }

      tool.save(function(err) {
        if (err) {
          return next(err);
        } else {
          //res.render('../views/index.jade', tool);
          res.json(tool);
        }
      });
    }
  });
};

tools.destroy = function(req, res, next) {
  Tool.remove({_id: req.params.tool}, function(err, tool) {
    if (err) {
      return next(err);
    } else {
      var message = 'ID: ' + req.params.tool + ' deleted from DB';
      res.json({message: message});
    }
  });
};
