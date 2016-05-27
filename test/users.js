const Lab = require('lab');
const lab = exports.lab = Lab.script();
const server = require('../index.js');
const code = require('code'); // assertion library to use with Lab

lab.experiment('Users: ', function() {

  lab.test('User lookup - successful',
    function(done){

      // here we're looking up a user with a valid id and the request is a success - 200 OK
      // @todo - db query to get real user id at random so we don't have to hardcode this?

      const actual = '574822a66e27ecd916949768';
      const expected = '574822a66e27ecd916949768';

      var options = {method: 'GET', url:'/users/' + actual};
      server.inject(options, function(response){

        code.expect(response.result).to.be.an.object();
        code.expect(response.result.id).to.equal(expected);
        code.expect(response.statusCode).to.equal(200);

        done();

      });
    });

  lab.test('User lookup - with invalid id',
    function(done){

      // here we're looking up a user with an id that's not in Mongo ObjectId format - a 400 bad request
      var options = {method: 'GET', url:'/users/invaliduserid'};
      server.inject(options, function(response){

        code.expect(response.result).to.be.an.object();
        code.expect(response.result.statusCode).to.equal(400);
        code.expect(response.result.error).to.equal('Bad Request');
        code.expect(response.result.message).to.equal('Invalid User Id');

        done();

      });


    });

  lab.test("User lookup - user doesn't exist",
    function(done){

      // here we're looking up a user with an id in the correct format but the user doesn't exist - 404 resource not found
      var options = {method: 'GET', url:'/users/574822a66e27ecd916949760'};
      server.inject(options, function(response){

        code.expect(response.result).to.be.an.object();
        code.expect(response.statusCode).to.equal(404);
        code.expect(response.result.error).to.equal('Not Found');

        done();

      });

    });

  lab.test('User create - successful',
    function(done){

      // here we're successfully creating a new a user - 200 OK
      // and cleaning up at the end of the test by deleting the test user
      // once the test passes.

      server.inject(options, function(response){

        code.expect(response.result).to.be.an.object();
        code.expect(response.result.id).to.equal(expected);
        code.expect(response.statusCode).to.equal(200);

        done();

      });
    });

});

