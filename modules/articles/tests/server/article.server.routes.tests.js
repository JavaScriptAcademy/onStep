'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Article = mongoose.model('Article'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, article;

/**
 * Article routes tests
 */
describe('Article CRUD tests', function () {

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

    // Save a user to the test db and create new Article
    user.save(function () {
      article = {
        name: 'Article name'
      };

      done();
    });
  });

  it('should be able to save a Article if logged in', function (done) {
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

        // Save a new Article
        agent.post('/api/articles')
          .send(article)
          .expect(200)
          .end(function (articleSaveErr, articleSaveRes) {
            // Handle Article save error
            if (articleSaveErr) {
              return done(articleSaveErr);
            }

            // Get a list of Articles
            agent.get('/api/articles')
              .end(function (articlesGetErr, articlesGetRes) {
                // Handle Article save error
                if (articlesGetErr) {
                  return done(articlesGetErr);
                }

                // Get Articles list
                var articles = articlesGetRes.body;

                // Set assertions
                (articles[0].user._id).should.equal(userId);
                (articles[0].name).should.match('Article name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Article if not logged in', function (done) {
    agent.post('/api/articles')
      .send(article)
      .expect(403)
      .end(function (articleSaveErr, articleSaveRes) {
        // Call the assertion callback
        done(articleSaveErr);
      });
  });

  it('should not be able to save an Article if no name is provided', function (done) {
    // Invalidate name field
    article.name = '';

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

        // Save a new Article
        agent.post('/api/articles')
          .send(article)
          .expect(400)
          .end(function (articleSaveErr, articleSaveRes) {
            // Set message assertion
            (articleSaveRes.body.message).should.match('Please fill Article name');

            // Handle Article save error
            done(articleSaveErr);
          });
      });
  });

  it('should be able to update an Article if signed in', function (done) {
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

        // Save a new Article
        agent.post('/api/articles')
          .send(article)
          .expect(200)
          .end(function (articleSaveErr, articleSaveRes) {
            // Handle Article save error
            if (articleSaveErr) {
              return done(articleSaveErr);
            }

            // Update Article name
            article.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Article
            agent.put('/api/articles/' + articleSaveRes.body._id)
              .send(article)
              .expect(200)
              .end(function (articleUpdateErr, articleUpdateRes) {
                // Handle Article update error
                if (articleUpdateErr) {
                  return done(articleUpdateErr);
                }

                // Set assertions
                (articleUpdateRes.body._id).should.equal(articleSaveRes.body._id);
                (articleUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Articles if not signed in', function (done) {
    // Create new Article model instance
    var articleObj = new Article(article);

    // Save the article
    articleObj.save(function () {
      // Request Articles
      request(app).get('/api/articles')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Article if not signed in', function (done) {
    // Create new Article model instance
    var articleObj = new Article(article);

    // Save the Article
    articleObj.save(function () {
      request(app).get('/api/articles/' + articleObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', article.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Article with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/articles/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Article is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Article which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Article
    request(app).get('/api/articles/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Article with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Article if signed in', function (done) {
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

        // Save a new Article
        agent.post('/api/articles')
          .send(article)
          .expect(200)
          .end(function (articleSaveErr, articleSaveRes) {
            // Handle Article save error
            if (articleSaveErr) {
              return done(articleSaveErr);
            }

            // Delete an existing Article
            agent.delete('/api/articles/' + articleSaveRes.body._id)
              .send(article)
              .expect(200)
              .end(function (articleDeleteErr, articleDeleteRes) {
                // Handle article error error
                if (articleDeleteErr) {
                  return done(articleDeleteErr);
                }

                // Set assertions
                (articleDeleteRes.body._id).should.equal(articleSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Article if not signed in', function (done) {
    // Set Article user
    article.user = user;

    // Create new Article model instance
    var articleObj = new Article(article);

    // Save the Article
    articleObj.save(function () {
      // Try deleting Article
      request(app).delete('/api/articles/' + articleObj._id)
        .expect(403)
        .end(function (articleDeleteErr, articleDeleteRes) {
          // Set message assertion
          (articleDeleteRes.body.message).should.match('User is not authorized');

          // Handle Article error error
          done(articleDeleteErr);
        });

    });
  });

  it('should be able to get a single Article that has an orphaned user reference', function (done) {
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

          // Save a new Article
          agent.post('/api/articles')
            .send(article)
            .expect(200)
            .end(function (articleSaveErr, articleSaveRes) {
              // Handle Article save error
              if (articleSaveErr) {
                return done(articleSaveErr);
              }

              // Set assertions on new Article
              (articleSaveRes.body.name).should.equal(article.name);
              should.exist(articleSaveRes.body.user);
              should.equal(articleSaveRes.body.user._id, orphanId);

              // force the Article to have an orphaned user reference
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

                    // Get the Article
                    agent.get('/api/articles/' + articleSaveRes.body._id)
                      .expect(200)
                      .end(function (articleInfoErr, articleInfoRes) {
                        // Handle Article error
                        if (articleInfoErr) {
                          return done(articleInfoErr);
                        }

                        // Set assertions
                        (articleInfoRes.body._id).should.equal(articleSaveRes.body._id);
                        (articleInfoRes.body.name).should.equal(article.name);
                        should.equal(articleInfoRes.body.user, undefined);

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
      Article.remove().exec(done);
    });
  });
});
