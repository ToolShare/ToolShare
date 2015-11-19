var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Tool = require('../models/Tool');

router.get('/:category?', function(req, res, next) {
  var category = req.params.category ? req.params.category :'power';
  options = {
    category: category,
    isAvailable: true,
  }
  Tool.find(options)
  .exec(function(err, dbtools) {
    if (req.user) {
      var filteredTools = dbtools.filter(function(tool){
        return (tool.userId !== req.user.id)
      })
      dbtools = filteredTools
    }
    var tools = [];
    var toolType = {};
    dbtools.map(function(tool) {
      if (toolType[tool.name]) {
        toolType[tool.name] += 1
      } else {
        toolType[tool.name] = 1;
      }
    });
    for (key in toolType) {
      tools.push({name:key,count:toolType[key]})
    }
    var user = req.user ? req.user : false;
    res.render('findtools', {
      category: category,
      tools: tools,
      cats: require('../helpers/toolsList'),
      user: user,
    })
  });
})


module.exports = router;
