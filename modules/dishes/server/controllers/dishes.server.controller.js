'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Dish = mongoose.model('Dish'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

// find most popular dish
/*exports.mostPopularDish = function(req, res, next) {
  Dish.find().sort({ orderTimes:-1 }).exec(function(err,data){
    res.render('index', { cImages:data })
  })
};
*/
/**
 * Create a Dish
 */
exports.create = function(req, res) {
  var dish = new Dish(req.body);
  dish.user = req.user;

  dish.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(dish);
    }
  });
};

/**
 * Show the current Dish
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var dish = req.dish ? req.dish.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  dish.isCurrentUserOwner = req.user && dish.user && dish.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(dish);
};

/**
 * Update a Dish
 */
exports.update = function(req, res) {
  var dish = req.dish ;

  dish = _.extend(dish , req.body);

  dish.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(dish);
    }
  });
};

/**
 * Delete an Dish
 */
exports.delete = function(req, res) {
  var dish = req.dish ;

  dish.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(dish);
    }
  });
};

/**
 * List of Dishes
 */
exports.list = function(req, res) {
  Dish.find().sort('-created').populate('user', 'displayName').exec(function(err, dishes) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(dishes);
    }
  });
};

/**
 * Dish middleware
 */
exports.dishByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Dish is invalid'
    });
  }

  Dish.findById(id).populate('user', 'displayName').exec(function (err, dish) {
    if (err) {
      return next(err);
    } else if (!dish) {
      return res.status(404).send({
        message: 'No Dish with that identifier has been found'
      });
    }
    req.dish = dish;
    next();
  });
};
