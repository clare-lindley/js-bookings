var db = require('../../db');

var userSchema = db.Schema({
  username:  { type: String, required: true},
  password: { type: String, required: true},
  created: { type: Date, default: Date.now },
  bookingId: {type: String, default: null},
  contact: {
    name: String,
    phone: String,
    email: String
  }
});

var User = db.model('User', userSchema);

module.exports = User;
