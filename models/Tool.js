var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Tool = new Schema({
  userID: String,
  toolId: Number,
  category: String,
  description: String,
  isAvailable: Boolean
});

Tool.plugin(passportLocalMongoose);

module.exports = mongoose.model('Tool', Tool);
