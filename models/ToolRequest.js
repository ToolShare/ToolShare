var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var ToolRequest = new Schema({
  lenderId: String,
  requesterId: String,
  toolId: String,
  Status: String
});

ToolRequest.plugin(passportLocalMongoose);

module.exports = mongoose.model('ToolRequest', ToolRequest);
