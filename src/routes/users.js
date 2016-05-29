"use strict";

const User = require('../model/user');
const Boom = require('boom');

module.exports = function(){
  return [
    {
      method: 'POST',
      path: '/users',
      handler: function createUser(request, reply) {

        var user = new User({
          username: request.payload.username,
          password: request.payload.password,
          contact: request.payload.contact
        });

        user.save(function(err, user){
          if(err){
            if(err.code === 11000){
              reply(Boom.badRequest('User already exists'));
            }
            else {
              reply(Boom.badImplementation());
            }
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
      },
    },
    {
      method: 'GET',
      path: '/users/{id}',
      handler: function (request, reply) {

        User.findById(request.params.id, function (err, user) {

          if (err){
            // @todo replce with check for Error code
            if(err.name == 'CastError'){
              reply(Boom.badRequest('Invalid User Id'));
            }
            else {
              reply(Boom.badImplementation());
            }
          }
          else {
            if(user){
              reply(user);
            }
            else {
              reply(Boom.notFound());
            }
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
