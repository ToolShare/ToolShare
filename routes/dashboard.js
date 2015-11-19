var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Tool = require('../models/Tool');
var ToolRequest = require('../models/ToolRequest');

router.get('/', function(req, res, next) {
  if (!req.isAuthenticated()) {
    req.session.loginErr = 'You are not logged in';
    res.redirect('/login')
  }
  var user = null;
  User.findById(req.user.id)
  .populate('tools')
  .populate('borrowReqs')
  .populate('loanReqs')
  .exec(function(err, user) {
    ToolRequest.populate(user, {path: 'borrowReqs._lender'}, function(err, breqs){
      res.render('dashboard', {user:user, tools:user.tools, borrowReqs:user.borrowReqs, lendReqs:user.loanReqs})
    })

  });

  // var borrowReqs = new Promise(function(res, rej) {
  //   ToolRequest.find({requesterId:user.id})
  //   //.populate('_lender')
  //   .exec(function(err, reqs) {
  //
  //     rej(err);
  //     res(reqs);
  //   })
  // });
  //
  // var lendReqs = new Promise(function(res, rej) {
  //   ToolRequest.find({lenderId:user.id})
  //   //.populate('_borrower')
  //   .exec(function(err, reqs) {
  //
  //     res(reqs);
  //     rej(err);
  //   });
  // });
  //
  // Promise.all([borrowReqs, lendReqs])
  //   .then(function(results){
  //
  //     var borrowReqs = results[0];
  //     var lendReqs = results[1];
  //     res.render('dashboard')//, {user: req.user, tools: user.tools, borrowReqs: borrowReqs, lendReqs: lendReqs});
  //   })
  //   .catch(function(err) {
  //     next(err);
  //   });
});

module.exports = router;
