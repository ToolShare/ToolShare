var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Tool = new Schema({
  username: String,
  password: String
});

Tool.plugin(passportLocalMongoose);

module.exports = mongoose.model('Tool', Tool);
