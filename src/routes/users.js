"use strict";

const userController = require('../controller/user');

module.exports = function(){
  return [
    {
      method: 'POST',
      path: '/users',
      handler: userController.create
    },
    {
      method: 'GET',
      path: '/users/{id}',
      handler: userController.read
    },
    {
      method: 'POST',
      path: '/users/{id}',
      handler: function (request, reply) {
        reply('Update User');
      },
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
