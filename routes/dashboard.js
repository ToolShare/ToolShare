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
  Promise.all([
    User.findById(req.user.id).populate('tools'),
    ToolRequest.find({requesterId:req.user.id}).populate('_lender _tool'), // borrow reqs
    ToolRequest.find({lenderId:req.user.id,status:'open'}).populate('_requester _tool'), // lend reqs
  ])
  .then(function(results){
    console.log(results[1].length)
    var user = results[0]
    var borrowReqs = results[1]
    var loanReqs = results[2]

    var tools = {}
    user.tools.map(function(tool) {
      if (!tools[tool.category]) tools[tool.category] = []
      tools[tool.category].push(tool);
    });
    borrowReqs.map(function(bReq) {
      if (bReq.status === 'accept') {
        var tool = bReq._tool
        tool.status = 'borrowed';
        tool.reqId = bReq.id;
        if (!tools[tool.category]) tools[tool.category] = []
        tools[tool.category].push(tool);
      }
    })
    var filteredReqs = borrowReqs.filter(function(bReq){
      return (bReq.status !== 'accept')
    })
    res.render('dashboard', {user:user, tools:tools, borrowReqs:filteredReqs, lendReqs:loanReqs})
  })
  .catch(function(err) {
    return next(err)
  })
});

module.exports = router;
