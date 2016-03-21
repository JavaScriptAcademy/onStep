'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Order = mongoose.model('Order'),
  Dish = mongoose.model('Dish'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Order, this is used for
 * create an order from the order button of detail page
 */
exports.create = function(req, res){
  dishId = req.body.dishes.id;
  console.log(">>>>>" + req.dishId);
  Order.findOne({status: 'PreOrder'},{}, function(error, order){
    if(order === null){
      Dish.findOne({_id: dishId}, {}, function(error, dish){
        if(dish === null){
          return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
          });
        }
        order = new Order();
        order._creator = req.user._id;
        order.dishes.push({
          _dish: dish,
          quantity: 1
        });
        order.deliverInfo = null;
        order.totalPrice = null;
        order.status = 'PreOrder';
        order.save(function(err) {
          if(err){
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
          });
          }else{
          res.jsonp({ orderId: order._id });
          }
        });
      });

    }else{
      Dish.findOne({_id: dishId}, {}, function(error, dish){
        if(dish === null){
          return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
        }
        var existing = false;
        _.each(order.dishes, function(dishItem){
          if(String(dishItem._dish) === String(dish._id)){
            ++dishItem.quantity;
            existing = true;
          }
        });
        if(existing === false){
          order.dishes.push({
            _dish: dish,
            quantity: 1
          });
        }

        order.save(function(err) {
          if(err){
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          }else{
            res.jsonp({ orderId: order._id });
          }
        });
      });
    }
  });
};

/**
 * Create a Order, this is used for create an order from the cart-page
 */
/*exports.create = function(req, res) {
  Order.findOne({status: 'PreOrder'},{}, function(error, order){
    if(order === null){
      order = new Order();
      order._creator = req.user._id;
      for(var i = 0; i < req.body.dishes.length; i++){
        order.dishes.push({
          _dish: mongoose.Types.ObjectId(req.body.dishes[i]._id),
          quantity: Number(req.body.dishes[i].quantity)
        });
      }
      order.deliverInfo = req.body.deliverInfo;
      order.totalPrice = req.body.totalPrice;
      order.status = 'PreOrder';
      order.save(function(err) {
        if(err){
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        }else{
          res.jsonp({ orderId: order._id });
        }
      });
    }else{
      // console.log(order.dishes);
      var existing = false;
      for(var i = 0; i < req.body.dishes.length; i++){
        existing = false;
        for(var j = 0; j < order.dishes.length; j++){
          if(String(req.body.dishes[i]._id) === String(order.dishes[j]._dish)){
            order.dishes[j].quantity++;
            existing = true;
            break;
          }
        }
        if(existing === false){
          for(var i = 0; i < req.body.dishes.length; i++){
            order.dishes.push({
              _dish: mongoose.Types.ObjectId(req.body.dishes[i]._id),
              quantity: Number(req.body.dishes[i].quantity),
            });
          }
        }
      }
       order.save(function(err) {
        if(err){
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        }else{
          res.jsonp({ orderId: order._id });
        }
      });
    }
  });
};*/

/**
 * Show the current Order
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var order = req.order ? req.order.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  order.isCurrentUserOwner = req.user && order.user && order.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(order);
};

/**
 * Update a Order
 */
exports.update = function(req, res) {
  console.log('HI');
  var order = req.order;
  order = _.extend(order , req.body);

  order.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(order);
    }
  });
};

/**
 * Delete an Order
 */
exports.delete = function(req, res) {
  var order = req.order ;

  order.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(order);
    }
  });
};

/**
 * List of Orders
 */
exports.list = function(req, res) {
  Order.find().sort('-created').populate('user', 'displayName').exec(function(err, orders) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(orders);
    }
  });
};

/**
 * Order middleware
 */
exports.orderByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Order is invalid'
    });
  }

  Order.findById(id).populate('user', 'username').exec(function (err, order) {
    if (err) {
      return next(err);
    } else if (!order) {
      return res.status(404).send({
        message: 'No Order with that identifier has been found'
      });
    }
    req.order = order;
    next();
  });
};
