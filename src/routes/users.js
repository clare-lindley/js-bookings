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

        // @todo check this mongoose save syntax and callback
        user.save(function(err, user){
          if(err){
            reply(err);
          }
          else {
            reply({userID: user._id})
              .type('application/json');
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
