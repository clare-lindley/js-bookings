var db = require('../../db');

var userSchema = new db.Schema({
  username:  { type: String, required: true, unique : true},
  password: { type: String, required: true},
  created: { type: Date, default: Date.now },
  bookingId: {type: String, default: null},
  contact: {
    name: String,
    phone: String,
    email: String
  }
});

userSchema.path('username').index({ unique: true });

var User = db.model('User', userSchema);

module.exports = User;
