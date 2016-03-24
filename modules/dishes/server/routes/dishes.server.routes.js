'use strict';

/**
 * Module dependencies
 */
var dishesPolicy = require('../policies/dishes.server.policy'),
  dishes = require('../controllers/dishes.server.controller');

module.exports = function(app) {
  // Dishes Routes
  //build the api for random dishes
  app.route('/api/dishes/listTop').get(dishes.listTop);
  app.route('/api/dishes/getRandom').get(dishes.getRandom);
  app.route('/api/dishes').all(dishesPolicy.isAllowed)
    .get(dishes.list)
    .post(dishes.create);

  app.route('/api/dishes/:dishId').all(dishesPolicy.isAllowed)
    .get(dishes.read)
    .put(dishes.update)
    .delete(dishes.delete);

  // Finish by binding the Dish middleware
  app.param('dishId', dishes.dishByID);
};
