var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Tool = require('../models/Tool');

// router.use(function(req, res, next) {
//   next();
// });

router.get('/', function(req, res, next) {
  var category = req.param.category ? req.param.category :'power';
  category = 'power';
  //console.log(req.user);
  Tool.find({
    category: category,
    isAvailable: true,
    //userId: !req.user.id
  },
  function(err, dbtools) {
    console.log(dbtools);
    var tools = {
      category: category,
      toolNames: []
    };
    for (i = 0; i < dbtools.length; i++) {
      tools.toolNames[i] = {
        name: dbtools[i].name,
        count: "1"

      }
    }
    //res.send(tools)
    res.render('findtools', {
      category: tools.category,
      tools: tools.toolNames

    })
  });
})


module.exports = router;
