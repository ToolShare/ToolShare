var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Tool = require('../models/Tool');
var ToolRequest = require('../models/ToolRequest');

router.get('/', function(req, res, next) {
  var promiseResults = {}
  if (!req.isAuthenticated()) {
    req.session.loginErr = 'You are not logged in';
    res.redirect('/login')}
  var user = req.user;

  var userTools = new Promise(function(res, rej) {
    Tool.find({userId: req.user.id}, function(err, tools) {
      res(tools);
      rej(err);
    });
  });

  var borrowReqs = new Promise(function(res, rej) {
    ToolRequest.find({requesterId:user.id}, function(err, reqs) {
      res(reqs);
      rej(err);
    });
  });

  var lendReqs = new Promise(function(res, rej) {
    ToolRequest.find({lenderId:user.id}, function(err, reqs) {
      res(reqs);
      rej(err);
    });
  });

  Promise.all([userTools, borrowReqs, lendReqs])
    // .then(function(results) {
    //   var promiseResults.tools: results[0],
    //     romiseResults.borrowReqs: results[1],
    //     romiseResults.lendReqs: results[2]
    //   }
    //   var borrowreqlookups = []
    //   results[1].forEach(result){
    //     borrowreqlookups.push(new Promise(function(res, rej){
    //       User.findById(result.lenderId, function(err, lender) {
    //         res(lender)
    //         rej(err)
    //       })
    //     }))
    //   })
    //   return borrowreqlookups
    // })
    // .then(function(lookups){
    //   Promise.all(lookups)
    //   .then()
    // })
    .then(function(results) {
      var tools = results[0];
      var borrowReqs = results[1];
      var lendReqs = results[2]
      res.render('dashboard', {user: user, tools: tools, borrowReqs: borrowReqs, lendReqs: lendReqs});
    })
    .catch(function(err) {
      next(err);
    });
});

module.exports = router;
