const Lab = require('lab');
const lab = exports.lab = Lab.script();
const server = require('../index.js');
const User = require('../src/model/user');
const code = require('code'); // assertion library to use with Lab

lab.experiment('Users: ', function() {

  lab.test('User lookup - successful',
    function(done){

      // here we're looking up a user with a valid id and the request is a success - 200 OK

      User
        .findOne()
        .exec(function(err, user) {
          if(err){
            throw err;
          }else {

            const actual = user.id;
            const expected = user.id;

            var options = {method: 'GET', url:'/users/' + actual};
            server.inject(options, function(response){

              code.expect(response.result).to.be.an.object();
              code.expect(response.result.id).to.equal(expected);
              code.expect(response.statusCode).to.equal(200);

              done();

            });

          }

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
    function(done, onCleanup){

      var payload = {
        username: 'test_username',
        password: '123456',
        contact: {
          "name": 'Miss Testy McTest',
          "phone": '01924 467567',
          "email": 'testy@testmail.com'
        }
      }
      var options = {method: 'POST', url:'/users', payload: payload};

      server.inject(options, function(response){

        onCleanup((next) => {

          User.findOneAndRemove({ _id: response.result.id }, function(err){
            if(err){
              throw err;
            }
            else {
              console.log('test user ' + response.result.id + ' deleted successfully');
            }
          });

          return next();
        });

        code.expect(response.result).to.be.an.object();
        code.expect(response.result.username).to.equal('test_username');
        code.expect(response.result.contact.name).to.equal('Miss Testy McTest');
        code.expect(response.result.contact.phone).to.equal('01924 467567');
        code.expect(response.result.contact.email).to.equal('testy@testmail.com');
        code.expect(response.statusCode).to.equal(200);

        done();

      });
    });

  lab.test('User create - user already exists',
    function(done){

      User
        .findOne()
        .exec(function(err, user) {
          if(err){
            console.log(error.message);
          }else {
            var options = {method: 'POST', url:'/users', payload: user};

            server.inject(options, function(response){

              code.expect(response.result).to.be.an.object();
              code.expect(response.statusCode).to.equal(400);
              code.expect(response.result.error).to.equal('Bad Request');
              code.expect(response.result.message).to.equal('User already exists');

              done();

            });

          }

        });

    });

  lab.test('User create - required fields are missing',
    function(done){

      var payload = {}
      var options = {method: 'POST', url:'/users', payload: payload};

      server.inject(options, function(response){

        code.expect(response.result).to.be.an.object();
        code.expect(response.statusCode).to.equal(400);
        code.expect(response.result.error).to.equal('Bad Request');
        code.expect(response.result.message).to.equal('Missing Username or Password');

        done();

      });

    });

  // User create - payload is present but in the wrong format
  // here is where we need to add validation with Joi:

  // expect payload to contain: username string
  // expect payload to contain: password string
  // expect payload to contain: contact object, length: 3
  // expect payload to contain: contact object.name: string
  // expect payload to contain: contact object.phone: string
  // expect payload to contain: contact object.email: string


  // @todo User delete
  // @todo User update
  // @todo All other CRUD errors should be handled by the API code as generic 500 'its broken' message
  // and the specifics logged and emailed to me. At the moment I'm throwing them so I can see immediately if something breaks.
  // @todo Any invalid request methods are already handled by HAPI as 400 - but still need tests for this

});

