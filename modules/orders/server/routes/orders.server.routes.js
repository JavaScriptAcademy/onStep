'use strict';

/**
 * Module dependencies
 */
var ordersPolicy = require('../policies/orders.server.policy'),
  orders = require('../controllers/orders.server.controller');

module.exports = function(app) {
  // Orders Routes
  app.route('/api/orders').all(ordersPolicy.isAllowed)
    .get(orders.list)
    .post(orders.create);

  app.route('/api/orders/:orderId').all(ordersPolicy.isAllowed)
    .get(orders.read)
    .put(orders.update)
    .delete(orders.delete);

  app.route('/api/orders/:orderId/:userId').all(ordersPolicy.isAllowed)
    .get(orders.getUserOrder);

  // Finish by binding the Order middleware
  app.param('orderId', orders.orderByID);

/*  app.route('/api/orders/status/:orderStatus').all(ordersPolicy.isAllowed)
    .get(orders.orderByStatus);*/
};
