var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/social', function(){
  console.log('Mongo connected');
});

module.exports = mongoose;
