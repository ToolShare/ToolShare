var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var ToolRequest = new Schema({
  lenderId: String,
  requesterId: String,
  toolId: String,
  Status: String,
});

module.exports = mongoose.model('ToolRequest', ToolRequest);
