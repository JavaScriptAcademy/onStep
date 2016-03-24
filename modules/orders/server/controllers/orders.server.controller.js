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
  // var dishId = req.body.dishes.id;
  var dishId = req.body.dishId;
  Order.findOne({ status: 'preorder' },{ }, function(error, order){
    if(order === null){
      Dish.findOne({ _id: dishId }, { }, function(error, dish){
        if(dish === null){
          return res.status(400).send({
            message: errorHandler.getErrorMessage('dish is not found')
          });
        }
        order = new Order();
        order._creator = req.user._id;
        order.dishes.push({
          _dish: dish,
          name: dish.name,
          dishImage: dish.dishImage,
          price: dish.price,
          quantity: 1,
          sumPrice: dish.price*1
        });
        order.deliverInfo = {
          address: null,
          name: null,
          phone: null,
          time: {
            date: null,
            time: null
          }
        };
        order.totalPrice = dish.price;
        order.status = 'preorder';
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
      Dish.findOne({ _id: dishId }, { }, function(error, dish){
        if(dish === null){
          return res.status(400).send({
            message: errorHandler.getErrorMessage('dish is not found')
          });
        }
        var existing = false;
        _.each(order.dishes, function(dishItem){
          if(String(dishItem._dish) === String(dish._id)){
            ++dishItem.quantity;
            dish.sumPrice += dish.price;
            existing = true;
          }
        });
        if(existing === false){
          order.dishes.push({
            _dish: dish,
            name: dish.name,
            dishImage: dish.dishImage,
            price: dish.price,
            quantity: 1,
            sumPrice: dish.price
          });
        }
        order.totalPrice += dish.price;
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

/*Read order by status*/
/*exports.orderByStatus = function(req, res) {
  var status = req.body.status;
  Order.findOne({ 'status' : status }, { }, function(error, order){
    order.isCurrentUserOwner = req.user && order.user && order.user._id.toString() === req.user._id.toString() ? true : false;
    res.jsonp(order);
  });
};*/


/**
 * Update a Order
 */
exports.update = function(req, res) {
  var order = req.order;
  order = _.extend(order , req.body);
  order.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      if(order.status === 'paid'){
        _.each(order.dishes, function(dishOfOrder){
          Dish.findOne({ _id: dishOfOrder._dish }, { }, function(error, dish){
            dish.orderTimes += dishOfOrder.quantity;
            dish.save(function(err) {
              if(err){
                return res.status(400).send({
                  message: errorHandler.getErrorMessage(err)
                });
              }
            });
          });
        });
      }
      res.jsonp(order);
    }
  });
};

/**
 * Delete an Order
 */
exports.delete = function(req, res) {
  var order = req.order;

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

  Order.find({ _creator: req.user._id }).sort('-created').exec(function(err, orders) {
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
