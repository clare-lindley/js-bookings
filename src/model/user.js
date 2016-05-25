var db = require('../../db');

var userSchema = db.Schema({
  username: {type: 'String', required: true},
  password: {type: 'String', required: true}
});

var User = db.model('User', userSchema);

module.exports = User;
