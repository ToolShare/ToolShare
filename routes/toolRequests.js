var toolRequests = module.exports;
var ToolRequest = require('../models/ToolRequest');
var User = require('../models/User')
var Tool = require('../models/Tool')

toolRequests.index = function(req, res) {
  res.redirect('/');
};

toolRequests.new = function(req, res) {
  res.send('new toolRequests');
};

toolRequests.create = function(req, res, next) {

  Promise.all([User.findById(req.body.lenderId), User.findById(req.body.borrowerId), Tool.findById(req.body.toolId)])
  .then( function(results) {
    console.log(results)
    var lender = results[0]
    var requester = results[1]
    var tool = results[2]
    var toolRequest = new ToolRequest({
      lenderId: req.body.lenderId,
      _lender: lender,
      requesterId: req.body.borrowerId,
      _requester: requester,
      toolId: req.body.toolId,
      _tool: tool,
      status: 'open',
    })
    lender.loanReqs.push(toolRequest);
    requester.borrowReqs.push(toolRequest);
    Promise.all([lender,requester,toolRequest].map(function(obj) {
      obj.save()
    }))
  })
  .then(function() {
    res.redirect('/dashboard')
  })
  .catch(function(err){
    return next(err)
  })
};

toolRequests.show = function(req, res) {
  res.send('show toolRequests ' + req.params.toolRequests);
};

toolRequests.edit = function(req, res, next) {
  res.send('show toolRequests ' + req.params.toolRequests);
  //var toolReq = ToolRequest.findById(req.body.status)
};

toolRequests.update = function(req, res, next) {
  ToolRequest.findById(req.body.id, function(err, toolReq) {
    ToolRequest.update(toolReq,{status:req.body.status}, function(err, tr) {
      if (err) return next(err)
      res.send('updated')
    })
  })
};

toolRequests.destroy = function(req, res) {
  res.send('destroy toolRequests ' + req.params.toolRequests);
};
