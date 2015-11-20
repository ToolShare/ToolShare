var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip: Number,
  },
  tools: [{ type: Schema.Types.ObjectId, ref: 'Tool' }],
  borrowReqs: [{ type: Schema.Types.ObjectId, ref: 'ToolRequest' }],
  loanReqs: [{ type: Schema.Types.ObjectId, ref: 'ToolRequest' }],
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
