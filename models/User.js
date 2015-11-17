var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: String,
  password: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip: Number,
  },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
