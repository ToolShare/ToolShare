var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Tool = new Schema({
  userId: String, //must be unique for routing
  category: String,
  name: String,
  description: String,
  isAvailable: Boolean
});

module.exports = mongoose.model('Tool', Tool);
