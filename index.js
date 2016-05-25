'use strict';

const Hapi = require('hapi');
var routes = require('./src/routes');

const server = new Hapi.Server();
server.connection({host: 'localhost', port: 3000 });

// Add all the routes within the routes folder
for (var route in routes) {
  server.route(routes[route]);
}

server.start((err) => {

  if (err) {
  throw err;
}
console.log('Server running at:', server.info.uri);
});