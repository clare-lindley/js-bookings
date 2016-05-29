"use strict";

module.exports = function(){
  return [
    {
      method: 'POST',
      path: '/slots',
      handler: function (request, reply) {
        reply('Create Slot');
      }
    },
    {
      method: 'GET',
      path: '/slots/{id}',
      handler: function (request, reply) {
        reply('Read Slot');
      }
    },
    {
      method: 'POST',
      path: '/slots/{id}',
      handler: function (request, reply) {
        reply('Update Slot');
      }
    },
    {
      method: 'DELETE',
      path: '/slots/{id}',
      handler: function (request, reply) {
        reply('Delete Slot');
      }
    },
    {
      method: 'GET',
      path: '/slots',
      handler: function (request, reply) {
        reply('List Slots');
      }
    },
  ];
}();

