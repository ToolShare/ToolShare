var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Tool = require('../models/Tool');

router.get('/:category?', function(req, res, next) {
  var category = req.params.category ? req.params.category :'power';
  //console.log(req.user);
  Tool.find({
    category: category,
    isAvailable: true,
    //userId: !req.user.id
  },
  function(err, dbtools) {
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
    res.render('findtools', {
      category: category,
      tools: tools
    })
  });
})


module.exports = router;
