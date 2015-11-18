var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Tool = require('../models/Tool');

// router.use(function(req, res, next) {
//   next();
// });

router.get('/', function(req, res, next) {
  var category = req.param.category ? req.param.category :'power';
  category = 'Power Tools';
  console.log(req.user);
  Tool.find({
    category: category,
    isAvailable: true,
    //userId: !req.user.id
  }, function(err, tools) {
    // for (var i = 0; i < tools.length; i++) {

    // };
    console.log(tools);
  });

  console.log('we got this');


});
//   Tool.findById(req.params.tool, function(err, tool) {
//     if (err) {
//       return next(err);
//     } else {
//       res.json(tool);
//     }
//   });
// };






module.exports = router;
