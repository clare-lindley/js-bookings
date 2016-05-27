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
            //
          }
          else {
            reply(user);
          }
        });

      }
    },
    {
      method: 'POST',
      path: '/users/{id}',
      handler: function (request, reply) {
        reply('Update User');
      }
    },
    {
      method: 'GET',
      path: '/users/{id}',
      handler: function (request, reply) {

        User.findById(request.params.id, function (err, user) {

          if (err){
            // @todo find out if this is the best way to check for this.
            // (Joi validation will catch it before we let Mongo try anyway).
            if(err.name == 'CastError'){
              var response = {
                'status': '400',
                'code': 'ERR-01',
                'details': 'Invalid User Id provided'
              };
              reply(response).code(400);
            }
            else {
              reply('Server Error').code(500);
            }

          }
          else {
            reply(user);
          }

        });

      }
    },
    {
      method: 'DELETE',
      path: '/users/{id}',
      handler: function (request, reply) {
        reply('Delete User');
      }
    },
  ];
}();
