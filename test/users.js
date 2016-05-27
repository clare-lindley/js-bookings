const Lab = require('lab');
const lab = exports.lab = Lab.script();
const server = require('../index.js');
const code = require('code'); // assertion library to use with Lab

lab.experiment('Users: ', function() {

  lab.test('Successfully find a given User',
    function(done){

      const actual = '574822a66e27ecd916949768';
      const expected = '574822a66e27ecd916949768';

      var options = {method: 'GET', url:'/users/' + actual};
      server.inject(options, function(response){

        // check response is an object
        code.expect(response.result).to.be.an.object();

        // verify that the user has come back in the response
        code.expect(response.result.id).to.equal(expected);

        // verify status code is 200
        code.expect(response.statusCode).to.equal(200);

        done();

      });
    });
});

