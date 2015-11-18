var tools = module.exports;
var Tool = require('../models/Tool');

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
  res.send('new tools');
};

tools.create = function(req, res, next) {
  var tool = new Tool();

  tool.userId = req.body.userId;
  tool.category = req.body.category;
  tool.name = req.body.name;
  tool.description = req.body.description;
  tool.isAvailable = req.body.isAvailable;

  tool.save(function(err) {
    if (err) {
      return next(err);
    } else {
      //res.render('../views/index.jade', tool);
      res.json(tool);
    }
  });
};

tools.show = function(req, res, next) {
  Tool.findById(req.params.tool, function(err, tool) {
    if (err) {
      return next(err);
    } else {
      res.json(tool);
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
