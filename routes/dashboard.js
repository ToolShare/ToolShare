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
  Promise.all([User.findById(req.user.id).populate('tools'), ToolRequest.find({requesterId:req.user.id, status:'open'}).populate('_lender _tool'), ToolRequest.find({lenderId:req.user.id,status:'open'}).populate('_requester _tool')])
  .then(function(results){
    console.log(results)
    var user = results[0]
    var borrowReqs = results[1]
    var loanReqs = results[2]
    res.render('dashboard', {user:user, tools:user.tools, borrowReqs:borrowReqs, lendReqs:loanReqs})
  })
  .catch(function(err) {
    return next(err)
  })
});

module.exports = router;
