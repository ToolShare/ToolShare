var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Tool = require('../models/Tool');
var ToolRequest = require('../models/ToolRequest');

router.get('/dashboard', function(req, res, next) {
  var user = req.user;

  var userTools = new Promise(function(res, rej) {
    Tool.find({userId: user.id}, function(err, tools) {
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
    .then(function(tools, borrowReqs, lendReqs) {
      res.render('dashboard', {user: user, tools: tools, borrowReqs: borrowReqs, lendReqs: lendReqs});
    })
    .catch(function(err) {
      next(err);
    });
});
