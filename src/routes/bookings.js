"use strict";

module.exports = function(){
  return [
    {
      method: 'POST',
      path: '/bookings',
      handler: function (request, reply) {
        reply('Create Booking');
      }
    },
    {
      method: 'GET',
      path: '/bookings/{id}',
      handler: function (request, reply) {
        reply('Read Booking');
      }
    },
    {
      method: 'DELETE',
      path: '/bookings/{id}',
      handler: function (request, reply) {
        reply('Delete Booking');
      }
    },
    {
      method: 'GET',
      path: '/bookings',
      handler: function (request, reply) {
        reply('List Bookings');
      }
    }
  ];
}();


