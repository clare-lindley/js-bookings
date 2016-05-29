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
            if(err.code === 11000){ // MongoDB Duplicate Key Error
              reply(Boom.badRequest('User already exists'));
            }
            else if(err.name == 'ValidationError') { // Note: Mongoose errors don't have error codes
              reply(Boom.badRequest('Missing Username or Password'));
            }
            else {
              throw err;
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
            if(err.name == 'CastError'){ // Note: Mongoose errors don't have error codes
              reply(Boom.badRequest('Invalid User Id'));
            }
            else {
              throw err;
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
