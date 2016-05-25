"use strict";

var User = require('../model/user');

module.exports = function(){
  return [
    {
      method: 'POST',
      path: '/users',
      handler: function createUser(request, reply) {

        var user = new User({
          username: request.payload.username,
          password: request.payload.password
        });

        user.save(function(err, user){
          if(err){
            console.log(err);
          }
          else {
            reply('User Saved ' + user._id);
          }
        });

      }
    },
    {
      method: 'POST',
      path: '/users/{uuid}',
      handler: function (request, reply) {
        reply('Update User');
      }
    },
    {
      method: 'GET',
      path: '/users/{uuid}',
      handler: function (request, reply) {
        reply('Get User Account details');
      }
    },
    {
      method: 'DELETE',
      path: '/users/{uuid}',
      handler: function (request, reply) {
        reply('Delete User');
      }
    },
  ];
}();
