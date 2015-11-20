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
  if (!req.isAuthenticated()) {
    req.session.loginErr = "You need to login to view tools"
    res.redirect('/login')
  } else {
    User.findById(req.user.id, function(err, user) {
      if (err) return next(err);
      var tool = new Tool({
        userId: req.user.id,
        category: req.body.category,
        name: req.body.name,
        description: req.body.description,
        isAvailable: true,
        _user: user
      });

      user.tools.push(tool)
      Promise.all([user, tool].map(function(obj){
        obj.save()
      }))
      .then(function(){
        res.redirect('/dashboard')
      })
      .catch(function(err){
        return next(err)
      })
    })
  }
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
