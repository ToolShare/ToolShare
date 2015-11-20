var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Tool = new Schema({
  userId: String,
  category: String,
  name: String,
  description: String,
  isAvailable: Boolean,
  _user: {type: Number, ref: 'User'},
});

module.exports = mongoose.model('Tool', Tool);
