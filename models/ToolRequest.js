var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var ToolRequest = new Schema({
  lenderId: String,
  _lender: {type: Number, ref: 'User'},
  requesterId: String,
  _requester: {type: Number, ref: 'User'},
  toolId: String,
  status: String,
  reqStat: String,
  _tool: {type:Number, ref: 'Tool'},
});

module.exports = mongoose.model('ToolRequest', ToolRequest);
