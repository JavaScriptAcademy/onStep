'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Dish = mongoose.model('Dish'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, dish;

/**
 * Dish routes tests
 */
describe('Dish CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Dish
    user.save(function () {
      dish = {
        name: 'Dish name'
      };

      done();
    });
  });

  it('should be able to save a Dish if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Dish
        agent.post('/api/dishes')
          .send(dish)
          .expect(200)
          .end(function (dishSaveErr, dishSaveRes) {
            // Handle Dish save error
            if (dishSaveErr) {
              return done(dishSaveErr);
            }

            // Get a list of Dishes

            agent.get('/api/dishes')
              .end(function (dishsGetErr, dishsGetRes) {
                // Handle Dish save error
                if (dishsGetErr) {
                  return done(dishsGetErr);
                }

                // Get Dishes list
                var dishes = dishsGetRes.body;

                // Set assertions
                (dishes[0].user._id).should.equal(userId);
                (dishes[0].name).should.match('Dish name');

                // Call the assertion callback
                done();
              });

          });
      });
  });

  it('should not be able to save an Dish if not logged in', function (done) {
    agent.post('/api/dishes')
      .send(dish)
      .expect(403)
      .end(function (dishSaveErr, dishSaveRes) {
        // Call the assertion callback
        done(dishSaveErr);
      });
  });

  it('should not be able to save an Dish if no name is provided', function (done) {
    // Invalidate name field
    dish.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Dish
        agent.post('/api/dishes')
          .send(dish)
          .expect(400)
          .end(function (dishSaveErr, dishSaveRes) {
            // Set message assertion
            (dishSaveRes.body.message).should.match('Please fill Dish name');

            // Handle Dish save error
            done(dishSaveErr);
          });
      });
  });

  it('should be able to update an Dish if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Dish
        agent.post('/api/dishes')
          .send(dish)
          .expect(200)
          .end(function (dishSaveErr, dishSaveRes) {
            // Handle Dish save error
            if (dishSaveErr) {
              return done(dishSaveErr);
            }

            // Update Dish name
            dish.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Dish
            agent.put('/api/dishes/' + dishSaveRes.body._id)
              .send(dish)
              .expect(200)
              .end(function (dishUpdateErr, dishUpdateRes) {
                // Handle Dish update error
                if (dishUpdateErr) {
                  return done(dishUpdateErr);
                }

                // Set assertions
                (dishUpdateRes.body._id).should.equal(dishSaveRes.body._id);
                (dishUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Dishes if not signed in', function (done) {
    // Create new Dish model instance
    var dishObj = new Dish(dish);

    // Save the dish
    dishObj.save(function () {
      // Request Dishes
      request(app).get('/api/dishes')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Dish if not signed in', function (done) {
    // Create new Dish model instance
    var dishObj = new Dish(dish);

    // Save the Dish
    dishObj.save(function () {
      request(app).get('/api/dishes/' + dishObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', dish.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Dish with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/dishes/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Dish is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Dish which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Dish
    request(app).get('/api/dishes/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Dish with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Dish if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Dish
        agent.post('/api/dishes')
          .send(dish)
          .expect(200)
          .end(function (dishSaveErr, dishSaveRes) {
            // Handle Dish save error
            if (dishSaveErr) {
              return done(dishSaveErr);
            }

            // Delete an existing Dish
            agent.delete('/api/dishes/' + dishSaveRes.body._id)
              .send(dish)
              .expect(200)
              .end(function (dishDeleteErr, dishDeleteRes) {
                // Handle dish error error
                if (dishDeleteErr) {
                  return done(dishDeleteErr);
                }

                // Set assertions
                (dishDeleteRes.body._id).should.equal(dishSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Dish if not signed in', function (done) {
    // Set Dish user
    dish.user = user;

    // Create new Dish model instance
    var dishObj = new Dish(dish);

    // Save the Dish
    dishObj.save(function () {
      // Try deleting Dish
      request(app).delete('/api/dishes/' + dishObj._id)
        .expect(403)
        .end(function (dishDeleteErr, dishDeleteRes) {
          // Set message assertion
          (dishDeleteRes.body.message).should.match('User is not authorized');

          // Handle Dish error error
          done(dishDeleteErr);
        });

    });
  });

  it('should be able to get a single Dish that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Dish
          agent.post('/api/dishes')
            .send(dish)
            .expect(200)
            .end(function (dishSaveErr, dishSaveRes) {
              // Handle Dish save error
              if (dishSaveErr) {
                return done(dishSaveErr);
              }

              // Set assertions on new Dish
              (dishSaveRes.body.name).should.equal(dish.name);
              should.exist(dishSaveRes.body.user);
              should.equal(dishSaveRes.body.user._id, orphanId);

              // force the Dish to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Dish
                    agent.get('/api/dishes/' + dishSaveRes.body._id)
                      .expect(200)
                      .end(function (dishInfoErr, dishInfoRes) {
                        // Handle Dish error
                        if (dishInfoErr) {
                          return done(dishInfoErr);
                        }

                        // Set assertions
                        (dishInfoRes.body._id).should.equal(dishSaveRes.body._id);
                        (dishInfoRes.body.name).should.equal(dish.name);
                        should.equal(dishInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Dish.remove().exec(done);
    });
  });
});
