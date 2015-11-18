var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Tool = require('../models/Tool');

router.get('/findTools/:category?' , function(req, res, next) {
  var category = req.param.category ? req.param.category :'power';
  Tool.find = function({
    category: category,
    isAvailable: true,
    userId: !req.user.id
  });



 {
//   Tool.findById(req.params.tool, function(err, tool) {
//     if (err) {
//       return next(err);
//     } else {
//       res.json(tool);
//     }
//   });
// };






module.exports = router;
